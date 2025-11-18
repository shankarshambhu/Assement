import "reflect-metadata"
import { DataSource } from "typeorm"

import dotenv from "dotenv"
import { Product } from "../entities/Product";
import { Purchase } from "../entities/Purchase";
import { Sales } from "../entities/Sales";
import { Bill } from "../entities/Bill";
import { SaleItem } from "../entities/SaleItem";
dotenv.config();



export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)||5432,
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities:[Product,Purchase,Sales,Bill,SaleItem]

})