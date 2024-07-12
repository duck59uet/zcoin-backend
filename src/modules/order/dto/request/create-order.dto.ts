import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { OrderType } from '../../../../common/constants/app.constant';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  zc_amount: number;

  @ApiProperty()
  @IsNumber()
  vnd_amount: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  bank_image: string;

  @ApiProperty()
  @IsString()
  bank_name: string;

  @ApiProperty()
  @IsString()
  bank_numb: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  txHash: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_wallet: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  admin_wallet: string;

  @ApiProperty()
  @IsNotEmpty()
  type: OrderType;
}