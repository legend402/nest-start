import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuDto } from "src/database/entity/Menu.entity";
import { BaseService } from "src/service/BaseService";
import { Repository } from "typeorm";

@Injectable()
export class MenuService extends BaseService<MenuDto> {
  constructor(
    @InjectRepository(MenuDto)
    private readonly menuService: Repository<MenuDto>,
  ) {
    super(menuService)
  }
}