import { Product } from "../entities/Product"

export const getProductByName = async (name: string) => {
    try {
        return await Product.findOne({ where: { name } })

    } catch (error) {
        throw error

    }

}

export const createProductService = async (name: string, price: number, currentStock: number, taxPercentage: number) => {
    try {
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.price = price;
        newProduct.currentStock = currentStock;
        newProduct.taxPercentage = taxPercentage;
        return await newProduct.save()

    } catch (error) {
        throw error

    }

}

export const getAllProductService = async () => {
    try {
        return await Product.find();

    } catch (error) {
        throw error

    }

}

export const getProductById = async (id: string) => {
    try {
        return await Product.findOne({ where: { id } })

    } catch (error) {
        throw error

    }

}

export const updateProductService = async (payload: Partial<Product>, product: Product) => {
    try {
        const { name, price, currentStock, taxPercentage } = payload;
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (currentStock !== undefined) product.currentStock = currentStock;
        if (taxPercentage !== undefined) product.taxPercentage = taxPercentage;

        return await product.save()



    } catch (error) {
        throw error
    }

}