import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserRoleDto {
    @ApiProperty({
        description: 'User Role',
        type: String,
    })
    userRole: string;

    @ApiProperty({
        description: 'User Address',
        type: String,
    })
    address: string;
}