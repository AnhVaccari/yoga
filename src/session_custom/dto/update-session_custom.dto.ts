import { PartialType } from '@nestjs/swagger';
import { CreateSessionCustomDto } from './create-session_custom.dto';

export class UpdateSessionCustomDto extends PartialType(CreateSessionCustomDto) {}
