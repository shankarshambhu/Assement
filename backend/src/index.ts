import express from 'express'
import 'dotenv/config'
import { Connection } from './database/connectDB';
import productRoutes from './routes/product.route';
import purchaseRoutes from './routes/purchase.route'
import helmet from 'helmet';
import saleRoutes from './routes/sale.route'
import { errorHandler } from './middlewares/error.handler';
import cors from 'cors'
import dashboardRoutes  from './routes/dashboard.route'

const app = express();
app.use(helmet())

app.use(express.json())
app.use(helmet())

app.use(cors({
    origin:'http://localhost:5173'
}))
const PORT = process.env.PORT || 500;

app.use("/product", productRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/sale",saleRoutes);
app.use("/dashboard",dashboardRoutes);




app.use(errorHandler)



app.listen(PORT, () => {
    Connection();
    console.log("server is running at port ", PORT)

})