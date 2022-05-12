import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

let db = null;
const mongoClient = new MongoClient("mongodb://localhost:27017");
mongoClient.connect()
.then(() => {
    db = mongoClient.db("clothestoreDB");
    console.log(chalk.bold.blue("Contecado ao banco clothestoreDB"));
})
.catch(err => {
    console.log(chalk.bold.red("Erro ao conectar com o banco"), err);

})

app.use(json());
app.use(cors());

app.post("/signup", async (req, res) => {
    const {name, email, senha} = req.body;

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        senha: joi.string().required(),
        checkSenha: joi.ref("senha")
    });

    const validate = signUpSchema.validate(req.body);
    if (validate.error) {
        console.log(validate.error);
        return res.sendStatus(400);
    }

    try {
        const validate_email = await db.collection("users").findOne({email});
        if (validate_email) return res.sendStatus(409);

        const SALT = 10;
        await db.collection("users").insertOne({
            name, 
            email, 
            senha: bcrypt.hashSync(senha, SALT)
        });
        return res.sendStatus(201);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.post("/login", async (req, res) => {

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        senha: joi.string().required()
    });

    const validate = loginSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);

    try {
        const user = await db.collection("users").findOne({email: req.body.email});
        if (!user) return res.sendStatus(404);

        if (user && bcrypt.compareSync(req.body.senha, user.senha)) {
            const token = uuid();
            await db.collection("sessions").insertOne({token, userId: user._id});
            return res.status(201).send({token, name: user.name});
        }
        return res.sendStatus(404);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.delete("/logout", async (req, res) => {
    const {authorization} = req.headers;
    console.log(authorization);
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(403);
    console.log(token);

    try {
        const session = await db.collection("sessions").findOne({token});
        console.log(session);
        const session2 = await db.collection("sessions").deleteOne({token});
        
        res.status(200).send(session);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.get("/products", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.id});
        if (!user) return res.sendStatus(404);

        const products = await db.collections("products").find({id: user._id}).toArray();
        return res.status(202).send(products);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.post("/products", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    const productSchema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        img: joi.string.required(),
        price: joi.number().required(),
        qtd: joi.number().integer().required()
    });
    const validate = productSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);
    
    try {
        const session = await db.collection("sessions").findOne({token});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.id});
        if (!user) return res.sendStatus(404);

        await db.collection("products").insertOne({
            storeId: user._id,
            ...req.body
        });

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.get("products/:productId", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {


    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

const PORTA = 5000;
app.listen(PORTA, () => console.log(chalk.bold.green(`Servidor online na porta ${PORTA}`)));