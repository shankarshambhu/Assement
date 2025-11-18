import { NextFunction, Request, Response } from "express";
import { createProductService, deleteProductService, getAllProductService, getProductById, getProductByName, updateProductService } from "../services/product.service";
import { ApiError } from "../utils/api.Error";
import { Product } from "../entities/Product";
import { LessThan } from "typeorm";

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

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        if (!product) {
            throw new ApiError("Product not found", 404);
        }
        const deletedProduct = await deleteProductService(product);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            deletedProduct
        })

    } catch (error) {
        next(error)

    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        if (!product) {
            throw new ApiError("Product not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "fetched",
            product
        })

    } catch (error) {
        next(error)

    }

}


export const getShortProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find({ where: { currentStock: LessThan(10) } });
        if (!products) {
            throw new ApiError("No product has less than 10")
        }
        res.status(200).json({
            success: true,
            message: "successfull",
            products
        })

    } catch (error) {
        next(error)
    }

}