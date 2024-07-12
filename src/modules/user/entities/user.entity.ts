import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { BaseEntityAutoId } from '../../../common/entities';
import { Exclude } from 'class-transformer';
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({ name: 'users' })
export class User extends BaseEntityAutoId {
  @Column({ unique: true, nullable: false })
  wallet: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, type: 'bigint' })
  @Exclude()
  nonce: number;

  @Column({ nullable: true })
  @Exclude()
  vip: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: "enum", nullable: false,  enum: UserRole })
  role: UserRole;
}
