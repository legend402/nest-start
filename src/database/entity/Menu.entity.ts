import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import {BaseEntity} from "./base.entity";

@Entity()
export class MenuDto extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    parentId: string;

    @ManyToOne(() => MenuDto, menu => menu.children)
    @JoinColumn({ name: 'parentId' })
    parent: MenuDto;

    @Column({ type: 'int', default: 0 })
    level: number;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    component: string;

    @Column({ nullable: true })
    icon: string;

    @Column({ type: 'boolean', default: false })
    isLeaf: boolean;

    @Column({ type: 'int', default: 0 })
    sort: number;

    @OneToMany(() => MenuDto, menu => menu.parent)
    children: MenuDto[];
}