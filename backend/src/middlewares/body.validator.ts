import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "../utils/api.Error";
import { ObjectSchema } from 'joi'

export const validateBody = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {

    if (!req.body) {
        throw new ApiError("Request body is missing", 400)
    }
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
        const message = error.details.map((d) => d.message).join(", ")
        throw new ApiError(message, 400)
    }
    next()
}
