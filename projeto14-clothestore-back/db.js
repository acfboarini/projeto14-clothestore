import {MongoClient} from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.DB_URL);
await mongoClient.connect()
.then(() => {
    db = mongoClient.db("clothestoreDB");
    console.log(chalk.bold.blue("Contecado ao banco clothestoreDB"));
})
.catch(err => {
    console.log(chalk.bold.red("Erro ao conectar com o banco"), err);

})


export default db;