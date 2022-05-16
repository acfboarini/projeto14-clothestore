import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import db from "./db.js";

import userRouter from "./routes/userRouter.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartRouter.js"
// OBS: REMOVER TODOS OS JSON(TOKEN) DOS ENDOPOINTS POIS FORAM COLOCADOS ALI APENAS PARA TESTAR A API

const app = express();
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(userRouter);
app.use(productsRouter);
app.use(cartsRouter);

const PORTA = process.env.PORT || 5000;
app.listen(PORTA, () => console.log(chalk.bold.green(`Servidor online na porta ${PORTA}`)));