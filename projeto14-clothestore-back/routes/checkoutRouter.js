import { Router } from "express";
import db from "../db.js";

const checkoutRouter = new Router();

checkoutRouter.get('/cart/total', async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const cart = await db.collection("carts").findOne({userId: user._id});
        if (!cart) return res.sendStatus(404);

        //console.log(cart.products);
        const total = await totalPrice(cart.products);
        return res.status(200).send({total});
        
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

async function totalPrice(produtos) {
    let total = 0;
    await Promise.all(produtos.map(async productId => {
        const produto = await db.collection("products").findOne({_id: productId});
        total += produto.price;
    }));
    return total;
}

export default checkoutRouter;