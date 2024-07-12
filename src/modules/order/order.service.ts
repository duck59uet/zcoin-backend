import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos';
import { ErrorMap } from '../../common/error.map';
import { OrderRepository } from './order.repository';
import { GetOrderHistoryPathParamsDto } from './dto/request/get-order-by-user.request';
import { CommonUtil } from '../../utils/common.util';
import { Between } from 'typeorm';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from '../../common/constants/app.constant';
import { UpdateOrderDto } from './dto/request/admin-update-order.dto';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly commonUtil: CommonUtil = new CommonUtil();

  constructor(
    private orderRepo: OrderRepository,
  ) {
    this.logger.log('============== Constructor Order Service ==============');
  }

  async getUserOrderHistoryByUserId(
    param: GetOrderHistoryPathParamsDto
  ): Promise<ResponseDto<any>> {
    const { startTime, endTime } = param;

    try {
      const authInfo = this.commonUtil.getAuthInfo();
      const user_id = authInfo.id;
      const whereClause = { user_id: user_id };
      if (startTime && endTime) {
        whereClause['createTime'] = Between(startTime, endTime);
      }
      const data = await this.orderRepo.repo.find({
        where: whereClause,
        order: { createTime: 'DESC' }
      });
      return ResponseDto.response(ErrorMap.SUCCESSFUL, data);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<ResponseDto<any>> {
    try {
      const authInfo = this.commonUtil.getAuthInfo();
      let order = new Order();
      order.user_id = authInfo.id;
      order.admin_wallet = createOrderDto.admin_wallet;
      order.zc_amount = createOrderDto.zc_amount;
      order.vnd_amount = createOrderDto.vnd_amount;
      order.price = createOrderDto.price;
      order.bank_name = createOrderDto.bank_name;
      order.bank_numb = createOrderDto.bank_numb;
      order.bank_image = createOrderDto.bank_image;
      order.txHash = createOrderDto.txHash;
      order.discount = createOrderDto.discount;
      order.type = createOrderDto.type;
      order.status = OrderStatus.PENDING;
      order.createTime = new Date();
      order.updateTime = new Date();
      const createOrder = await this.orderRepo.repo.save(order);
      return ResponseDto.response(ErrorMap.SUCCESSFUL, createOrder);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<ResponseDto<any>> {
    try {
      const authInfo = this.commonUtil.getAuthInfo();
      let userAdd = authInfo.address;
      console.log(authInfo);
      if (authInfo.role !== UserRole.ADMIN) {
        console.log(authInfo.role);
        return ResponseDto.responseError(OrderService.name, ErrorMap.UN_AUTHORIZED);
      }
      let order = await this.orderRepo.repo.findOneBy({ id: updateOrderDto.id });
      if (updateOrderDto.status == OrderStatus.REJECT) {
        order.status = OrderStatus.REJECT;
      } else {
        if (updateOrderDto.bank_image) {
          order.bank_image = updateOrderDto.bank_image;
        }
        if (updateOrderDto.bank_name) {
          order.bank_name = updateOrderDto.bank_name;
        }
        if (updateOrderDto.bank_numb) {
          order.bank_numb = updateOrderDto.bank_numb;
        }
        if (updateOrderDto.txHash) {
          order.txHash = updateOrderDto.txHash;
        }
        order.admin_wallet = updateOrderDto.admin_wallet;
        order.status = OrderStatus.COMPLETE;
      }
      const updateOrder = await this.orderRepo.repo.save(order);
      return ResponseDto.response(ErrorMap.SUCCESSFUL, updateOrder);
    } catch (error) {
      return ResponseDto.responseError(OrderService.name, error);
    }
  }
}
