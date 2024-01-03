import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PosesService } from './poses.service';
import { CreatePoseDto } from './dto/create-pose.dto';
import { UpdatePoseDto } from './dto/update-pose.dto';

@Controller('poses')
export class PosesController {
  constructor(private readonly posesService: PosesService) {}

  @Post()
  create(@Body() createPoseDto: CreatePoseDto) {
    return this.posesService.create(createPoseDto);
  }

  @Get()
  findAll() {
    return this.posesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoseDto: UpdatePoseDto) {
    return this.posesService.update(+id, updatePoseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posesService.remove(+id);
  }
}
