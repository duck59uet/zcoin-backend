import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
    @ApiProperty({
        description: 'Avatar URL',
        type: String,
    })
    avatar: string;

    @ApiProperty({
        description: 'Username',
        type: String,
    })
    username: string;

    @ApiProperty({
        description: 'Bio',
        type: String,
    })
    bio: string;
}
