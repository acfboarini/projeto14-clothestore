
import joi from "joi";
import {  ObjectId } from "mongodb";
import db from "../db.js";

export async function postProducts(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    const productSchema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        qtd: joi.number().integer().required(),
        imgURL: joi.string().required(),
        category: joi.string().required()
    });
    const validate = productSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);
    
    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        await db.collection("products").insertOne({
            storeId: user._id,
            ...req.body
        });
        return res.sendStatus(201);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getProducts(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const products = await db.collection("products").find({}).toArray();
        return res.status(202).send(products);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getProductId(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const productId = req.params.productId;
        const product = await db.collection("products").findOne({_id: ObjectId(productId)});
        return res.status(200).send(product);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}