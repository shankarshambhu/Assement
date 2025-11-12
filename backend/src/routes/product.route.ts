import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/product.controller';
import { validateBody } from '../middlewares/body.validator';
import { productSchema } from '../validation/product.validation';

const router = express.Router();


router.post("/createproduct", validateBody(productSchema), createProduct);
router.get("/allproduct", getAllProduct);
router.put("/updateproduct/:id", validateBody(productSchema),updateProduct);
router.get("/getproduct/:id",getProduct)
router.delete("/deleteproduct/:id",deleteProduct)







export default router;