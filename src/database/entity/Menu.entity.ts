import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm";

@Entity()
export class MenuDto extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    parentId: number;

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