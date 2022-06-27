import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReqCat } from './cat.interface';
import { CatsService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getCatById(@Query('id') id: string) {
    console.log(id);
    return this.catService.findOne(id);
  }

  @Get('all')
  getAll() {
    return this.catService.findAll();
  }

  @Post()
  addCat(@Body() cat: ReqCat) {
    return this.catService.create(cat);
  }

  @Put()
  editCat(@Query('id') id: string, @Body() cat: ReqCat) {
    return this.catService.editCat(id, cat);
  }

  @Delete()
  delete(@Query('id') id: string) {
    this.catService.remove(id);
  }
}
