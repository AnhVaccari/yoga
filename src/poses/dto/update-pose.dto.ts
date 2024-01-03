import { PartialType } from '@nestjs/swagger';
import { CreatePoseDto } from './create-pose.dto';

export class UpdatePoseDto extends PartialType(CreatePoseDto) {}
