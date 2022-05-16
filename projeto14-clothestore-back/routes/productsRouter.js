import { Router } from "express";
import { postProducts, getProducts, getProductId } from "../controllers/productsController.js";


const productsRouter = new Router();

productsRouter.post('/products', postProducts);
productsRouter.get('/products', getProducts);
productsRouter.get('/products/:productId', getProductId );

export default productsRouter;
