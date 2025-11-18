import { BaseEntity, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Purchase } from "./Purchase";
import { Sales } from "./Sales";
import { Bill } from "./Bill";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    @Generated("uuid")
    sku: string

    @Column()
    price: number

    @Column()
    currentStock: number

    @Column()
    taxPercentage: number

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Purchase, (purchase) => purchase.product)
    purchase: Purchase[];


    @OneToMany(() => Bill, (bill) => bill.product)
    bill: Bill[];


}