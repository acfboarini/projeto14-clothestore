import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import joi from "joi";
import multer from "multer";
import db from "../db.js";

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


export async function login (req, res){

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
}

export async function signup (req, res) {
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
}

export async function logout (req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(403);

    try {
        const session = await db.collection("sessions").deleteOne({token: token});
        res.status(200).send(session);

    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}