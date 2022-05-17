import { Router, json } from "express";
import { /*postProducts, */getProducts, getProductId } from "../controllers/productsController.js";

// excluir depois
import joi from "joi";
import db from "../db.js";
// ate aqui

const productsRouter = new Router();
//productsRouter.use(json());

//productsRouter.post('/products', postProducts);
productsRouter.get('/products', getProducts);
productsRouter.get('/products/:productId', getProductId );

productsRouter.post('/products', async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    const productSchema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().required(),
        qtd: joi.number().integer().required(),
        imgURL: joi.string().required()
        //category: joi.string().required()
    });
    const validate = productSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);
    
    try {
        const session = await db.collection("sessions").findOne({token: json(token)});
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
});

export default productsRouter;