import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SetupHooverDto } from './setupHover.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  setupHoover(@Body() setup: SetupHooverDto) {
    return this.appService.setupHoover(setup);
  }
}
