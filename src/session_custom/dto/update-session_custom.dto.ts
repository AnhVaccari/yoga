import { IsOptional, Min, IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateSessionCustomDto {
  @IsString()
  @IsOptional()
  @Length(10, 255)
  @ApiProperty({ type: 'string', description: 'Title of the session_custom' })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    description: 'Description of the session_custom',
  })
  description?: string;

  @IsInt()
  @IsOptional()
  @Min(5)
  @ApiProperty({
    type: 'number',
    description: 'Duration of the session_custom',
  })
  duration?: number | null;
}
