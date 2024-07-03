import { ApiProperty } from '@nestjs/swagger';

export class ChartResponseDto {
  @ApiProperty({
    example: '1m',
  })
  date: any;

  @ApiProperty({
    example: '1.2',
  })
  open_price: string;

  @ApiProperty({
    example: '1.2',
  })
  high: string;

  @ApiProperty({
    example: '1.2',
  })
  low: string;

  @ApiProperty({
    example: '1.2',
  })
  close_price: string;

  @ApiProperty({
    example: 0
  })
  volume_from: number;

  @ApiProperty({
    example: 0
  })
  volume_to: number;
}