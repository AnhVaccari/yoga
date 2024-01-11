import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEmail, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 50)
  @ApiProperty({
    type: 'string',
    description: 'Username of the user',
    required: true,
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Email of the user',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @ApiProperty({
    type: 'string',
    description: 'Password of the user',
    required: true,
  })
  password: string;

  @IsDate()
  @ApiProperty({ type: 'date', description: 'Date_joined of the user' })
  date_joined?: Date;
}
