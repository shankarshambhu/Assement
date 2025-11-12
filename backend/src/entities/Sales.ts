import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sales extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    quantity: number



    @Column()
    salePrice: number

    @Column()
    discount:number



    @CreateDateColumn()
    date: Date

}