import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ChartResponseDto } from './dto/response/chart.response';

@Injectable()
export class OrderRepository {
    private readonly logger = new Logger(OrderRepository.name);

    constructor(
        @InjectRepository(Order)
        public repo: Repository<Order>,
    ) {
        this.logger.log(
            '============== Constructor Order Repository ==============',
        );
    }
}
