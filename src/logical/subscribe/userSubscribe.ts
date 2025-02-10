import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

import { AsyncLocalStorage } from 'async_hooks';
import { BaseEntity } from "../../database/entity/base.entity";
import {TokenUserMes} from "../../types/common";
import {asyncLocalStorage} from "../../utils/localStorage";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<BaseEntity> {
  beforeInsert(event: InsertEvent<BaseEntity>) {
    const userInfo = asyncLocalStorage.getStore()?.user;
      if (userInfo) {

        event.entity.createBy = userInfo.username;
        event.entity.updateBy = userInfo.username;
      }

  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    const userInfo = asyncLocalStorage.getStore()?.user;
    if (userInfo) {
      event.entity.updateBy = userInfo.username;
    }
  }
}

