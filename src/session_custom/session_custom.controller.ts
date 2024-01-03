import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SessionCustomService } from './session_custom.service';
import { CreateSessionCustomDto } from './dto/create-session_custom.dto';
import { UpdateSessionCustomDto } from './dto/update-session_custom.dto';

@Controller('session-custom')
export class SessionCustomController {
  constructor(private readonly sessionCustomService: SessionCustomService) {}

  @Post()
  create(@Body() createSessionCustomDto: CreateSessionCustomDto) {
    return this.sessionCustomService.create(createSessionCustomDto);
  }

  @Get()
  findAll() {
    return this.sessionCustomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionCustomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionCustomDto: UpdateSessionCustomDto) {
    return this.sessionCustomService.update(+id, updateSessionCustomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionCustomService.remove(+id);
  }
}
