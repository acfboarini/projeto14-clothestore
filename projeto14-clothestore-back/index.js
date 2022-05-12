import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import joi from "joi";

const app = express();
app.use(json());
app.use(cors());

const PORTA = 5000;
app.listen(PORTA, () => console.log(chalk.bold.green(`Servidor online na porta ${PORTA}`)));