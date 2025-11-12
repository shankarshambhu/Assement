import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Bill } from "./Bill";

@Entity()
export class Sales extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    quantity: number



    @Column()
    salePrice: number

    @Column({nullable:true})
    discount?: number



    @CreateDateColumn()
    date: Date





    @OneToOne(() => Bill, (bill) => bill.sale)
    bill: Bill;


    @OneToOne(() => Product, (product) => product.sale)
    product: Product;
}