import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Bill } from "./Bill";
import { SaleItem } from "./SaleItem";

@Entity()
export class Sales extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string



    @Column({nullable:true,type:"float"})
    total:number

    @CreateDateColumn()
    date: Date





    @OneToOne(() => Bill, (bill) => bill.sale)
    bill: Bill;


    @OneToMany(() => SaleItem, (item) => item.sale)
    item: SaleItem[];


}