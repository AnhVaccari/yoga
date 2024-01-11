import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(10, 50)
  @ApiProperty({ type: 'string', description: 'Name of the user' })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: 'string', description: 'Email of the user' })
  email?: string;

  @IsString()
  @IsOptional()
  @Length(8, 15)
  @ApiProperty({ type: 'string', description: 'Password of the user' })
  password?: string;
}
