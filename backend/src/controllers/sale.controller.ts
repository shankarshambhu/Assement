import { NextFunction, Request, Response } from "express";
import { getPurchaseByProductID } from "../services/purchase.service";
import { getProductById } from "../services/product.service";
import { createBill, createSaleService } from "../services/sale.service";
import { ApiError } from "../utils/api.Error";

export const createSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await getProductById(id);
        const purchase = await getPurchaseByProductID(id)



        if (!product) {
            throw new ApiError("Product not found")
        }

        if (!purchase) {
            throw new ApiError("Product not found")
        }

        const sale = await createSaleService(product, purchase, quantity);

        const bill=await createBill(sale,product)
        console.log(bill)
        res.status(200).json({
            success: true,
            message: "sold successfully",
            bill
        })

    } catch (error) {
        throw error

    }
}