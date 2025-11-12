import express from 'express'
import { createProduct, getAllProduct, updateProduct } from '../controllers/product.controller';
import { validateBody } from '../middlewares/body.validator';
import { productSchema } from '../validation/product.validation';

const router = express.Router();


router.post("/createproduct", validateBody(productSchema), createProduct);
router.get("/allproduct", getAllProduct);
router.put("/updateproduct/:id", validateBody(productSchema),updateProduct);







export default router;