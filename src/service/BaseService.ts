import {Injectable, Req} from '@nestjs/common';
import {
  Repository,
  SaveOptions,
  RemoveOptions,
  FindOptionsWhere,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
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

  async paginate(options: IPaginationOptions, addition?: FindManyOptions<T> | FindOptionsWhere<T>): Promise<Pagination<T>> {
    return paginate<T>(this.repository, options, addition);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
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
      .catch((err) => {
        console.log(err)
        updateResult = 0
      });
    return updateResult;
  }
}
