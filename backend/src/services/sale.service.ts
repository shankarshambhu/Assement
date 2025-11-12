import { Bill } from "../entities/Bill";
import { Product } from "../entities/Product";
import { Purchase } from "../entities/Purchase";
import { Sales } from "../entities/Sales";
import { ApiError } from "../utils/api.Error";

export const createSaleService = async (product: Product, purchase: Purchase, quantity: number) => {
    try {
        if (purchase.quantity < quantity) {
            throw new ApiError("Stock is not enough", 400);
        }

        const newSale = new Sales();

        let salePrice
        const total = product.price * quantity;
        let discount
        if (total > 2000) {
            const discount = 0.02 * (product.price);
            salePrice = total - discount
            newSale.discount = discount;
            newSale.salePrice = salePrice
            console.log(total)


        }
        else if (total >= 1000 && total <= 2000) {
            const discount = 0.01 * (product.price)
            salePrice = total - discount
            newSale.discount = discount;
            newSale.salePrice = salePrice




        }
        else {
            const discount = undefined;
            salePrice = total
            newSale.discount = discount;
            newSale.salePrice = salePrice;


        }

        newSale.quantity = quantity;


        return await newSale.save()




    } catch (error) {

        throw error
    }

}

export const createBill=async (sale:Sales,product:Product) => {
    try {
        const newBill=new Bill();
        newBill.sale=sale;
        newBill.product=product;
        return newBill.save();

        
    } catch (error) {
        throw error
        
    }
    
}