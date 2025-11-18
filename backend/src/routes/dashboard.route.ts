import express from 'express'
import { createSale, getBill } from '../controllers/sale.controller';
import { totalItems } from '../controllers/dashboard.controller';


const router = express.Router();

router.get("/totalitems/",totalItems);












export default router;