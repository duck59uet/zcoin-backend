import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserRoleDto {
    @ApiProperty({
        description: 'User Role',
        type: UserRole,
    })
    userRole: UserRole;

    @ApiProperty({
        description: 'User Address',
        type: String,
    })
    address: string;
}