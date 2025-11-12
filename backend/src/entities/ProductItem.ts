import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductItem extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string


    @Column()
    price:number

    @Column()
    currentStock:number

    @Column()
    taxPercentage:number

    @CreateDateColumn()
    createdAt:Date

}