import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { Public } from "src/common/decorator/public.decorator";
import { MenuService } from "src/controllers/Menu/Menu.service";
import { MenuDto } from "src/database/entity/Menu.entity";

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService
  ) { }

  @Public()
  @Post('add')
  async add(@Body() menu: MenuDto) {
    console.log(menu);
    return this.menuService.saveOne(menu);
  }

  @Public()
  @Get('tree')
  async getTree(@Query('id') id: number) {
    
    // 从数据库中获取所有菜单数据
    const allMenus = await this.menuService.findMany();
    if (allMenus.length === 0) {
      throw new Error('No menus found');
    }

    // 将菜单数据存储在一个映射中，以菜单的 id 作为键
    const menuMap = new Map<number, MenuDto>();
    allMenus.forEach(menu => {
      menuMap.set(menu.id, menu);
    });

    // 存储根菜单
    const rootMenus: MenuDto[] = [];

    // 遍历菜单数据，构建树形结构
    allMenus.forEach(menu => {
      if (menu.parentId === null) {
        rootMenus.push(menu);
      } else {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(menu);
          // 按照 sort 字段排序
          parent.children.sort((a, b) => a.sort - b.sort);
        }
      }
    });

    return id ? (menuMap.has(+id) ? [menuMap.get(+id)] : []) : rootMenus;
  }

  @Public()
  @Delete('delete')
  async delete(@Body() menu: MenuDto) {
    const { id } = menu;
    // 从数据库中获取所有菜单数据
    const allMenus = await this.getTree(id);
    const promises = [];
    // 遍历菜单数据，删除所有子菜单
    const deleteMenus = (menus: MenuDto[]) => {
      menus.forEach(menu => {
        if (menu.children && menu.children.length > 0) {
          deleteMenus(menu.children);
        }
        promises.push(this.menuService.delete({
          id: menu.id,
        }));
      });
    };
    deleteMenus(allMenus)
    try {
      await Promise.all(promises);
      return '删除成功';
    } catch (error) {
      return error;
    }
  }
}