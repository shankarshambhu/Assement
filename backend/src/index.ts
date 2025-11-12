import express from 'express'
import 'dotenv/config'
import { Connection } from './database/connectDB';
import productRoutes from './routes/product.routes';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error.handler';

const app = express();
app.use(helmet())

app.use(express.json())
app.use(helmet())

const PORT = process.env.PORT || 500;

app.use("/product", productRoutes);

app.use(errorHandler)



app.listen(PORT, () => {
    Connection();
    console.log("server is running at port ", PORT)

})