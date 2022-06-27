import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from '../../controllers/appController/app.service';
interface Data {
  name: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  getHello(@Param('id') id): string {
    console.log(id);
    return this.appService.getHello();
  }

  @Post('post')
  @HttpCode(201)
  changeHello(@Body() data: Data): string {
    return data.name;
  }
}
