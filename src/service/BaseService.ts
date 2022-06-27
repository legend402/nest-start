import { Injectable } from '@nestjs/common';
import {
  Repository,
  SaveOptions,
  RemoveOptions,
  FindOptionsWhere,
  FindOneOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseService<T> {
  protected readonly repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async saveOne(entity: T, options?: SaveOptions): Promise<T> {
    return this.repository.save(entity, options);
  }

  async saveMany(entities: T[], options?: SaveOptions): Promise<T[]> {
    return this.repository.save(entities, options);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async findMany(options?: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async removeOne(entity: T, options: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }

  async removeMany(entities: T[], options: RemoveOptions): Promise<T[]> {
    return this.repository.remove(entities, options);
  }

  async delete(options: FindOptionsWhere<T>) {
    this.repository.delete(options);
  }

  async update(
    conditions: number | FindOptionsWhere<T>,
    newValue: QueryDeepPartialEntity<T>,
  ): Promise<number> {
    let updateResult = 1;
    await this.repository
      .update(conditions, newValue)
      .catch(() => (updateResult = 0));
    return updateResult;
  }
}
