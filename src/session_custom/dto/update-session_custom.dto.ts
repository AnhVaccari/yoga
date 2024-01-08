import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateSessionCustomDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  duration?: number | null;
}
