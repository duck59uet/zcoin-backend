import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntityAutoId } from '../../../common/entities';
import { OrderStatus, OrderType } from '../../../common/constants/app.constant';

@Entity({ name: 'orders' })
export class Order extends BaseEntityAutoId {
  @Column({ nullable: false, type: 'bigint', name: 'zcAmount' })
  zc_amount: number;

  @Column({ nullable: false, type: 'bigint', name: 'vndAmount' })
  vnd_amount: number;

  @Column({ nullable: false, type: 'float4' })
  price: number;

  @Column({ nullable: false, name: 'userId', type: 'uuid' })
  user_id: string;

  @Column({ nullable: true, name: 'bankTx' })
  bank_image: string;

  @Column({ nullable: false, name: 'bankName' })
  bank_name: string;

  @Column({ nullable: false, name: 'bankNumb' })
  bank_numb: string;

  @Column({ nullable: true, name: 'discount' })
  discount: number;

  @Column({ nullable: true, name: 'txHash' })
  txHash: string;

  @Column({ nullable: true, name: 'userWallet' })
  user_wallet: string;

  @Column({ nullable: true, name: 'adminWallet' })
  admin_wallet: string;

  @Column({ nullable: false })
  type: OrderType;

  @Column({ nullable: false })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp', name: 'createTime' })
  createTime: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updateTime' })
  updateTime: Date;
}
