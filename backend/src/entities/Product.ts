import { BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    name:string

    @Column()
    @Generated("uuid")
    sku:string

    @Column()
    price:number

    @Column()
    currentStock:number

    @Column()
    taxPercentage:number

    @CreateDateColumn()
    createdAt:Date

}