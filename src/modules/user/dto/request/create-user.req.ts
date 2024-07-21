import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Address',
    type: String,
  })
  address: string;

  @ApiProperty({
    description: 'Username',
    type: String,
  })
  userName: string;

  @ApiProperty({
    description: 'User role',
    type: String,
  })
  userRole: string;
}
