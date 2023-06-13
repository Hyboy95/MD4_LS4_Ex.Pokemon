import express from "express";
import bodyParser from 'body-parser';
import 'dotenv/config';
import { APIRouter } from "./src/routers/api.router"

const PORT = process.env.PORT;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());

app.use(APIRouter);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`)
})