import "reflect-metadata"
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import "express-async-errors";
import './shared/container';
import { router } from "./routes";
import { handleErrors } from "./middlewares/ handleErrors";
import './database';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrors);

app.listen(3333, () => {
    console.log('🚀 Backend Started!!');
});
