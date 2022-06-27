import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ReqCat, Cat } from './cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: ReqCat) {
    const id = randomUUID();
    const newCat = { ...cat, id };
    this.cats.push(newCat);
    return newCat;
  }

  findOne(id: string): Cat {
    return this.cats.find((item) => item.id === id);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  remove(id: string) {
    const index = this.cats.findIndex((item) => item.id === id);
    this.cats.splice(index, 1);
  }

  editCat(id: string, cat: ReqCat) {
    const index = this.cats.findIndex((item) => item.id === id);
    this.cats[index] = Object.assign(this.cats[index], cat);
    return this.cats[index];
  }
}
