import { Product } from "../entities/Product"
import { Purchase } from "../entities/Purchase"

export const getPurchaseByProductID = async (id: string) => {
    try {
        return await Purchase.findOne({ where: { product: { id } } })

    } catch (error) {
        throw error

    }

}

export const createPurchaseService = async (quantity: number, purchasePrice: number, product: Product) => {
    try {
        const newPurchase = new Purchase();
        newPurchase.quantity = quantity;
        newPurchase.purchasePrice = purchasePrice
        newPurchase.product = product
        return await newPurchase.save();


    } catch (error) {
        throw error

    }

}

export const purchaseAgain = async (quantity: number, purchasePrice: number, purchase: Purchase) => {
    try {


        if (quantity !== undefined) purchase.quantity = quantity;

        if (purchasePrice !== undefined) purchase.purchasePrice = purchasePrice;
        return await purchase.save();

    } catch (error) {
        throw error

    }
}

export const getAllPurchase = async () => {
    try {
        return await Purchase.find({ relations: ['product'] })

    } catch (error) {
        throw error

    }

}