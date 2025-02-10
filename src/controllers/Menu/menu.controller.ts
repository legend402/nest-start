import {Body, Controller, Delete, Get, Post, Put, Query} from "@nestjs/common";
import { Public } from "src/common/decorator/public.decorator";
import { MenuService } from "src/controllers/Menu/Menu.service";
import { MenuDto } from "src/database/entity/Menu.entity";
import {travelTree} from "../../utils/tree";
import {isEmpty} from "lodash";

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService
  ) { }

  @Post('add')
  async add(@Body() menu: MenuDto) {
    return this.menuService.saveOne(menu);
  }

  @Put('edit')
  async edit(@Body() menu: MenuDto) {
    return this.menuService.update({
      id: menu.id,
    }, menu);
  }

  @Get('tree')
  async getTree(@Query('id') id: string) {
    
    // 从数据库中获取所有菜单数据
    const allMenus = await this.menuService.findMany();
    if (allMenus.length === 0) {
      return [];
    }

    // 将菜单数据存储在一个映射中，以菜单的 id 作为键
    const menuMap = new Map<string, MenuDto>();
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
    travelTree(rootMenus, (item) => {
      if (isEmpty(item.children)) {
        item.isLeaf = true;
      }
    })
    console.log(menuMap)
    return id ? (menuMap.has(id) ? [menuMap.get(id)] : []) : rootMenus;
  }

  @Delete('delete')
  async delete(@Query('id') id: string) {
    if (!id) {
      return '请选择需要删除数据的id';
    }
    console.log(id)
    // 从数据库中获取所有菜单数据
    const allMenus = await this.getTree(id);
    console.log(allMenus);
    return 'ok'
    // const promises = [];
    // // 遍历菜单数据，删除所有子菜单
    // const deleteMenus = (menus: MenuDto[]) => {
    //   menus.forEach(menu => {
    //     if (menu.children && menu.children.length > 0) {
    //       deleteMenus(menu.children);
    //     }
    //     promises.push(this.menuService.delete({
    //       id: menu.id,
    //     }));
    //   });
    // };
    // deleteMenus(allMenus)
    // try {
    //   await Promise.all(promises);
    //   return '删除成功';
    // } catch (error) {
    //   return error;
    // }
  }
}