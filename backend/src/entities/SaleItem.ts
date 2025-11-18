import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Bill } from "./Bill";
import { Purchase } from "./Purchase";
import { Sales } from "./Sales";

@Entity()
export class SaleItem extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string


    @Column()
    quantity: number


    @Column({type:"float"})
    salePrice: number

    @Column({ nullable: true })
    discount?: number


    @CreateDateColumn()
    date: Date


    @ManyToOne(() => Purchase, (purchase) => purchase.item, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    purchase: Purchase;




    @ManyToOne(() => Sales, (sale) => sale.item, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    sale: Sales;





}