import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { OrderStatus, OrderType } from '../../../../common/constants/app.constant';

export class UpdateOrderDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bank_image?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bank_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bank_numb?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  txHash?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  admin_wallet: string;

  @ApiProperty()
  @IsNotEmpty()
  status: OrderStatus;
}