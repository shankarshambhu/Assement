import { NextFunction, Request, Response } from "express";
import { createProductService, getAllProductService, getProductById, getProductByName, updateProductService } from "../services/product.service";
import { ApiError } from "../utils/api.Error";
import { Product } from "../entities/Product";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, currentStock, taxPercentage } = req.body
        const product = await getProductByName(name);
        if (product) {
            throw new ApiError("Product already there", 400)
        }
        const createdProduct = await createProductService(name, price, currentStock, taxPercentage);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            createdProduct
        })

    } catch (error) {
        next(error)

    }

}

export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getAllProductService();
        res.status(200).json({
            success: true,
            message: "fetched",
            products
        })

    } catch (error) {
        next(error)

    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        if (!product) {
            throw new ApiError("Product not found", 404);
        }
        const updatedProduct = await updateProductService(req.body, product);
        res.status(200).json({
            success: true,
            message: "updated product",
            updatedProduct
        })

    } catch (error) {
        next(error)

    }

}