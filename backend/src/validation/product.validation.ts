import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(2).messages({
        "string.empty": " Name cannot be empty",
        "string.min": "Name must be at least 2 characters",
    }),
    price: Joi.number().min(0).messages({
        "number.base": "Price should be a number",
        "any.required": "Price is a required field",
        "number.min": "Price cannot be negative",
    }),
    currentStock: Joi.number().min(0).messages({
        "currentStock.base": 'Stock should be a number',
        "any.required": "Stock is a required field",
        "currentStock.min": "Stock cannot be negative",

    }),
    taxPercentage: Joi.number().min(0).max(100).messages({
        "taxPercentage.base": 'tax should be a number',
        "any.required": "tax is a required field",
        "taxPercentage.min": "tax cannot be negative",
        "taxPercentage.max":'tax cannot be greater than 100'

    }),

})



