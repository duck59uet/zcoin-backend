import { Body, Controller, Logger, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CONTROLLER_CONSTANTS,
  URL_CONSTANTS,
} from '../../common/constants/api.constant';
import { OrderService } from './order.service';
import { CommonAuthGet, CommonAuthPost } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos';
import { GetOrderHistoryPathParamsDto } from './dto/request/get-order-by-user.request';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { Order } from './entities/order.entity';
import { EditUserDto } from '../user/dto/request/edit-user.req';
import { UpdateOrderDto } from './dto/request/admin-update-order.dto';

@Controller(CONTROLLER_CONSTANTS.ORDER)
@ApiTags(CONTROLLER_CONSTANTS.ORDER)
export class OrderController {
  public readonly logger = new Logger(OrderController.name);

  constructor(private orderService: OrderService) {}
  @CommonAuthGet({
    url: URL_CONSTANTS.USER_ORDER_HISTORY,
    summary: 'Get user order history of campaign',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'User order history',
      schema: {},
    },
  })
  async getUserOrderHistory(@Param() param: GetOrderHistoryPathParamsDto) {
    this.logger.log('========== Get user order history ==========');
    return this.orderService.getUserOrderHistoryByUserId(param);
  }


  @CommonAuthPost({
    url: 'order',
    summary: 'user create order while buy/sell zcoin',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'create order',
      schema: {},
    },
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<ResponseDto<any>> {
    return this.orderService.createOrder(createOrderDto);
  }

  @CommonAuthPost({
    url: 'update',
    summary: 'admin update order',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'admin update order',
      schema: {},
    },
  })
  async updateOrder(@Body() body: UpdateOrderDto) {
    this.logger.log('========== Edit user info ==========');
    return this.orderService.updateOrder(body);
  }
}
