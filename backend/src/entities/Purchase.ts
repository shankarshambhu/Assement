import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}