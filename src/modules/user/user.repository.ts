import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CustomError } from '../../common/custom-error';
import { ErrorMap } from '../../common/error.map';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {
    this.logger.log(
      '============== Constructor User Repository ==============',
    );
  }

  /**
   * getUsers
   * @param limit
   * @param skip
   * @returns
   */
  getUsers(limit: number, skip: number): Promise<User[]> {
    return this.repo.find({
      take: limit,
      skip,
    });
  }

  async getUserByAddress(address: string): Promise<User> {
    const qb = this.repo.createQueryBuilder('users')
      .where({
        deletedAt: IsNull(),
      })
      .andWhere(
        `users.wallet ilike :addr`,
        {
          addr: address
        }
      )

    return qb.getOne();
  }

  async initUser(addr: string, nonce: number): Promise<User> {
    let user = await this.getUserByAddress(addr.toString());

    if (user !== null) return user;

    user = new User();

    user.wallet = addr;
    user.nonce = nonce;
    user.role = UserRole.USER;
    user.vip = 0;
    return await this.repo.save(user);
  }

  async updateUserNonce(user: User, nonce: number) {
    user.nonce = nonce;
    return await this.repo.save(user);
  }

  async editUserInfo(address: string, avatar: string, userName: string, bio: string): Promise<User> {
    let user = await this.getUserByAddress(address);

    if(!user) {
      throw new CustomError(ErrorMap.USER_NOT_FOUND);
    }
 
    user.avatar = avatar;
    user.username = userName;
    user.bio = bio;
    return await this.repo.save(user);
  }
}
