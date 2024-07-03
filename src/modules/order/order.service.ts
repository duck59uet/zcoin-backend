import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ErrorMap } from '../../common/error.map';
import { DrawChartParamDto, DrawChartQueryDto } from './dto/request/draw-chart.req';
import { OrderRepository } from './order.repository';
import { GetOrderHistoryPathParamsDto } from './dto/request/get-order-collection.request';
import { CommonUtil } from '../../utils/common.util';
import { CollectionType } from '../../common/constants/app.constant';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly commonUtil: CommonUtil = new CommonUtil();

  constructor(
    private orderRepo: OrderRepository,
  ) {
    this.logger.log('============== Constructor Order Service ==============');
  }
}
