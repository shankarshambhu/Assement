import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

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

}