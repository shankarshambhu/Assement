import { NextFunction, Request, Response } from "express";
import { getPurchaseByProductID } from "../services/purchase.service";
import { getProductById } from "../services/product.service";
import { ApiError } from "../utils/api.Error";
import { Sales } from "../entities/Sales";
import { Bill } from "../entities/Bill";
import { SaleItem } from "../entities/SaleItem";



export const createSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cart } = req.body;

        const items = cart
        if (!Array.isArray(items)) {
            throw new ApiError("Items is required")
        }
        const sale = new Sales();
        await sale.save();
        const bill = new Bill()
        let totalPurchasePrice = 0;


        for (const item of items) {
            const { id, quantity } = item;
            const product = await getProductById(id);
            const purchase = await getPurchaseByProductID(id);
            if (!product) {
                throw new ApiError("Product not found", 404)
            }
            if (!purchase) {
                throw new ApiError("Purchase not found", 404)
            }
            if (purchase?.quantity < quantity) {
                throw new ApiError("Stock  not enough", 404)
            }
            const saleItem = new SaleItem();
            saleItem.quantity = quantity;
            const total = product.price * quantity;
            purchase.quantity -= quantity;

            let salePrice
            let tax
            console.log("total", total)
            let amountaftertax

            if (total > 2000) {
                const discount = 0.02 * total;
                const tax = total * (Number(product.taxPercentage) / 100);
                const amountAfterTax = total - discount + tax;
                saleItem.salePrice = amountAfterTax;
                saleItem.discount = discount;
                saleItem.quantity = quantity;
                console.log("greater than 2000")
                totalPurchasePrice += amountaftertax!





            }
            else if
                (total >= 1000 && total <= 2000) {
                const discount = 0.01 * total;
                const tax = total * (Number(product.taxPercentage) / 100);
                const amountAfterTax = total - discount + tax;

                saleItem.salePrice = amountAfterTax;
                saleItem.discount = discount;
                saleItem.quantity = quantity;

                totalPurchasePrice += amountAfterTax;
            }

            else if (total < 1000) {
                const tax = total * (Number(product.taxPercentage) / 100);
                const amountAfterTax = total + tax;
                saleItem.salePrice = amountAfterTax;
                saleItem.quantity = quantity;
                saleItem.discount = 0;
                console.log("less than 1000")
                totalPurchasePrice += salePrice!



            }
            saleItem.purchase = purchase;
            saleItem.sale = sale;
            await product.save();
            await purchase.save();
            await saleItem.save();
            await sale.save();
        }
        sale.total = totalPurchasePrice;
        await sale.save();


        // const createdBill=await createBill(sale)

        res.status(200).json({
            sucess: true,
            message: "sales  successfully",
            sale,

        })





    } catch (error) {
        next(error)

    }

}


export const getBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const sale = await SaleItem.findOne({ where: { sale: { id } }, relations: ['sale'] });
        if (!sale) {
            throw new ApiError("Sale not found", 404)
        }
        res.status(200).json({
            success: true,
            message: "Bill fetched",
            total: sale
        })

    } catch (error) {
        next(error)

    }

}