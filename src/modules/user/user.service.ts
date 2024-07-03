import { Injectable, Logger } from '@nestjs/common';
import { ResponseDto } from '../../common/dtos/response.dto';
import { ErrorMap } from '../../common/error.map';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CommonUtil } from '../../utils/common.util';
import { EditUserDto } from './dto/request/edit-user.req';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly commonUtil: CommonUtil = new CommonUtil();

  constructor(private userRepo: UserRepository) {
    this.logger.log('============== Constructor User Service ==============');
  }

  async getUserInfo(): Promise<ResponseDto<User>> {
    try {
      const authInfo = this.commonUtil.getAuthInfo();
      const address = authInfo.address;

      const user = await this.userRepo.getUserByAddress(address);
      return ResponseDto.response(ErrorMap.SUCCESSFUL, user);
    } catch (error) {
      return ResponseDto.responseError(UserService.name, error);
    }
  }

  async editUserInfo(request: EditUserDto): Promise<ResponseDto<User>> {
    try {
      const { username, avatar, bio } = request;
      const authInfo = this.commonUtil.getAuthInfo();
      const address = authInfo.address;

      this.logger.log('========== Edit user info ==========');
      const user = await this.userRepo.editUserInfo(address, avatar, username, bio);
      return ResponseDto.response(ErrorMap.SUCCESSFUL, user);
    } catch (error) {
      return ResponseDto.responseError(UserService.name, error);
    }
  }
}
