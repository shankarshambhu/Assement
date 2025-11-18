import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { SaleItem } from "./SaleItem";

@Entity()
export class Purchase extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string


    @Column()
    quantity: number



    @Column()
    purchasePrice: number




    @CreateDateColumn()
    date: Date


    @ManyToOne(() => Product, (product) => product.purchase, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    product: Product;



    @OneToMany(() => SaleItem, (item) => item.purchase)
    item: SaleItem[];

}