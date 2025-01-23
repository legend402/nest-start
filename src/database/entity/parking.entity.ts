import {BaseEntity} from "./base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ParkingDto extends BaseEntity {
    // 自增
    @PrimaryGeneratedColumn('uuid', {
        comment: 'id',
    })
    id: number;
}
