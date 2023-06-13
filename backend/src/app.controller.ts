import { Body, Controller, HttpCode, Post, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { SetupHooverDto } from './dto/setupHover.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { badRequestResponse, okResponse } from './swagger/responses';

@ApiTags('Main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('setup')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(okResponse)
  @ApiBadRequestResponse(badRequestResponse)
  setupHoover(@Body() setup: SetupHooverDto) {
    return this.appService.setupHoover(setup);
  }
}
