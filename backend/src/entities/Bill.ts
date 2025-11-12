import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Sales } from "./Sales";

@Entity()
export class Bill extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string


    @CreateDateColumn()
    date: Date

    @OneToOne(() => Sales, (sale) => sale.bill, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()

    sale: Sales;

    @ManyToOne(() => Product, (product) => product.purchase, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    product: Product;


}