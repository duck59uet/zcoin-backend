import { ApiProperty } from '@nestjs/swagger';
import { ChartType } from '../../../../common/constants/app.constant';
import { IsEnum } from 'class-validator';

export class DrawChartParamDto {
  @ApiProperty({
    description: 'Symbol',
    type: String,
  })
  symbol: string;
}

export class DrawChartQueryDto {
  @IsEnum(ChartType)
  @ApiProperty({
    description: 'Chart type',
    enum: ChartType
  })
  type: string;
}