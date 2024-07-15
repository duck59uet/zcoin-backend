import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RoleType } from '../../constants';
import { Web3LoginDTO } from './dto/web3-login.dto';
import { isValidUserSignature } from '../../decorators/wallet.decorators';
import { UserRepository } from '../user/user.repository';
import { ContextProvider } from '../../providers/contex.provider';
import { Buffer } from 'buffer';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  async userGetNonce(addr: string): Promise<number> {
    const nonce = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;

    // const formatAddr = standardizeAddress(addr);

    let user = await this.userRepo.getUserByAddress(addr);
    if (user === null) {
      // user = await this.userRepo.initUser(addr, nonce);
      throw new BadRequestException('User not found');
    }

    // update user's nonce
    await this.userRepo.updateUserNonce(user, nonce);
    return nonce;
  }

  async userLogIn(loginDTO: Web3LoginDTO): Promise<string> {
    let { addr, message, signature } = loginDTO;

    // addr = standardizeAddress(addr);

    if (!isValidUserSignature(addr, message, signature)) {
      throw new UnauthorizedException('Invalid Signature');
    }

    const user = await this.userRepo.getUserByAddress(addr);
    if (user === null) {
      throw new BadRequestException('User not found');
    }

    return await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
      address: addr
    });
  }

  /**
   * getAuthUser
   * @returns
   */
  static getAuthUser() {
    return ContextProvider.getAuthUser();
  }
}
