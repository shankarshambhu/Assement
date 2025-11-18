import { NextFunction, Request, Response } from "express";
import { SaleItem } from "../entities/SaleItem";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export const totalItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);



        const saleToday = await SaleItem.find({
            where: {
                date: Between(today,tomorrow), 
            }
        })

        res.status(200).json({
            success:true,
            message:"successfull",
            saleToday
        })

    } catch (error) {
        next(error)

    }

}