import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import { response } from "express";
import multer from "multer";

// OBS: REMOVER TODOS OS JSON(TOKEN) DOS ENDOPOINTS POIS FORAM COLOCADOS ALI APENAS PARA TESTAR A API

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

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let nameImage = ""
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    
        const extensionImage = file.originalname.split('.')[1];

        const newName = uuid();

        cb(null, `${newName}.${extensionImage}`)
        nameImage = `${newName}.${extensionImage}`
    }
});

const upload = multer({ storage });

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
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(403);

    try {
        const session = await db.collection("sessions").deleteOne({token: json(token)});
        res.status(200).send(session);

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
        price: joi.number().required(),
        qtd: joi.number().integer().required(),
        imgURL: joi.string().required(),
        category: joi.string().required()
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

app.get("/products", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: json(token)});
        if (!session) return res.sendStatus(401);

        const user = await db.collection("users").findOne({_id: session.userId});
        if (!user) return res.sendStatus(401);

        const products = await db.collection("products").find({}).toArray();
        return res.status(202).send(products);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

app.get("/products/:productId", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: json(token)});
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
});

app.post("/cart", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);
    const {productId} = req.body;

    try {
        const session = await db.collection("sessions").findOne({token: json(token)});
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
});

app.get("/cart", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({token: json(token)});
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
});

app.delete("/cart/:productId", async (req, res) => {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);
    const {productId} = req.params;

    try {
        const session = await db.collection("sessions").findOne({token: json(token)});
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
});

const PORTA = 5000;
app.listen(PORTA, () => console.log(chalk.bold.green(`Servidor online na porta ${PORTA}`)));