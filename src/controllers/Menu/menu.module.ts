import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuController } from "src/controllers/Menu/menu.controller";
import { MenuService } from "src/controllers/Menu/Menu.service";
import { MenuDto } from "src/database/entity/Menu.entity";

@Module({
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([MenuDto])],
})
export class MenuModule {}