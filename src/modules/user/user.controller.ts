import { Body, Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CONTROLLER_CONSTANTS,
  URL_CONSTANTS,
} from '../../common/constants/api.constant';
import { CommonAuthGet, CommonAuthPost } from '../../decorators/common.decorator';
import { ResponseDto } from '../../common/dtos';
import { UserService } from './user.service';
import { EditUserDto } from './dto/request/edit-user.req';
import { CreateUserDto } from './dto/request/create-user.req';
import { UpdateUserRoleDto } from './dto/request/update-user-role.req';

@Controller(CONTROLLER_CONSTANTS.USER)
@ApiTags(CONTROLLER_CONSTANTS.USER)
export class UserController {
  public readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @CommonAuthGet({
    url: '',
    summary: 'Get user info',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'User detail',
      schema: {},
    },
  })
  async getUserInfo() {
    this.logger.log('========== Get user info ==========');
    return this.userService.getUserInfo();
  }

  @CommonAuthPost({
    url: '',
    summary: 'Edit user info',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Edit user detail',
      schema: {},
    },
  })
  async editUserInfo(@Body() body: EditUserDto) {
    this.logger.log('========== Edit user info ==========');
    return this.userService.editUserInfo(body);
  }

  @CommonAuthPost({
    url: '',
    summary: 'Create user info',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Edit user detail',
      schema: {},
    },
  })
  async createUser(@Body() body: CreateUserDto) {
    this.logger.log('========== create new user ==========');
    return this.userService.createUser(body);
  }

  @CommonAuthPost({
    url: '',
    summary: 'Update user role',
    apiOkResponseOptions: {
      status: 200,
      type: ResponseDto,
      description: 'Update user role',
      schema: {},
    },
  })
  async updateRoleUserInfo(@Body() body: UpdateUserRoleDto) {
    this.logger.log('========== Edit user info ==========');
    return this.userService.updateUserRole(body);
  }
}
