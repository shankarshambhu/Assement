import express from 'express'
import { createSale, getBill } from '../controllers/sale.controller';
import { getLastTenSales, totalItems, totalSales } from '../controllers/dashboard.controller';


const router = express.Router();

router.get("/totalitems/",totalItems);
router.get("/totalsales",totalSales);
router.get("/lasttensales",getLastTenSales)












export default router;