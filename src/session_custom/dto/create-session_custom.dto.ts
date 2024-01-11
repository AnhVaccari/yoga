import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsInt, Min } from 'class-validator';
export class CreateSessionCustomDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, 255)
  @ApiProperty({ type: 'string', description: 'Title of the session_custom' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Description of the session_custom',
  })
  description: string;

  @IsInt()
  @IsNotEmpty()
  @Min(5)
  @ApiProperty({
    type: 'number',
    description: 'Duration of the session_custom',
  })
  duration: number;
}
