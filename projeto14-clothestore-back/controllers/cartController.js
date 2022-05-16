
import { ObjectId } from "mongodb";

import db from "../db.js";

export async function postCart(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);
    const {productId} = req.body;

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const cart = await db.collection("carts").findOne({userId: user._id});
        if (cart) {
            const product = await db.collection("carts").findOne({products: ObjectId(productId)});
            if (product) return res.sendStatus(409);

            await db.collection("carts").updateOne({userId: user._id}, {$push:{products: ObjectId(productId)}});
            return res.sendStatus(201);

        } else {
            const new_cart = await db.collection("carts").insertOne({
                userId: user._id,
                products: new Array(ObjectId(productId))
            });
            return res.status(201).send(new_cart);
        }

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }    
}

export async function getCart(req, res) {
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
        return res.status(200).send(cart.products);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }    
}

export async function deleteProductId(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);
    const {productId} = req.params;

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const cart = await db.collection("carts").findOne({userId: user._id});
        if (!cart) return res.status(404).send("carrinho do usuario nao encontrado");

        await db.collection("carts").updateOne({userId: user._id}, {$pull:{products: ObjectId(productId)}});
        return res.sendStatus(200);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }    
}