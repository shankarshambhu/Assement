import express from 'express'
import { createPurchase, getAllPruchases } from '../controllers/purchase.controller';


const router = express.Router();

router.post("/createpurchase/:id",createPurchase);
router.get("/allpurchases",getAllPruchases);










export default router;