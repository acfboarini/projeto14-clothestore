import { Router } from "express";
import { deleteProductId, postCart, getCart } from "../controllers/cartController.js";

const cartsRouter = new Router();

cartsRouter.post('/cart', postCart);
cartsRouter.get('/cart', getCart);
cartsRouter.delete('/cart/:productId"', deleteProductId );

export default cartsRouter;
