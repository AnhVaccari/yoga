import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'Username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Password',
  })
  password: string;
}
