import { NextFunction, Request, Response } from "express";
import { getProductById } from "../services/product.service";
import { ApiError } from "../utils/api.Error";
import { Purchase } from "../entities/Purchase";
import { createPurchaseService, getAllPurchase, getPurchaseByProductID, purchaseAgain } from "../services/purchase.service";

export const createPurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body
        const product = await getProductById(id);


        if (!product) {
            throw new ApiError("Product not found", 404);
        }
        if (product?.currentStock < quantity) {
            throw new ApiError("Stock not enough", 400)
        }

        const purchaseFound = await getPurchaseByProductID(id);
        if (!purchaseFound) {
            const purchasePrice = product.price * quantity
            const createdPurchase = await createPurchaseService(quantity, purchasePrice, product);
            res.status(200).json({
                success: true,
                message: "created purchase",
                createdPurchase
            })
        }
        else {

            const newQuantity = Number(purchaseFound.quantity) + Number(quantity);
            const newPurchasePrice = product.price * newQuantity;
            const updatedPurchase = await purchaseAgain(newQuantity, newPurchasePrice, purchaseFound);
            res.status(200).json({
                success: true,
                message: "Purchase updated",
                updatedPurchase
            })
        }

    } catch (error) {
        next(error)

    }

}

export const getAllPruchases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await getAllPurchase();
        res.status(200).json({
            success: true,
            message: "successfull",
            purchases
        })
    } catch (error) {
        next(error)

    }

}