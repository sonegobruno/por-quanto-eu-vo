import "reflect-metadata"

import express from 'express';
import cors from 'cors';
import "express-async-errors";
import './shared/container';
import { router } from "./routes";
import { handleErrors } from "./middlewares/ handleErrors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrors);

app.listen(3333, () => {
    console.log('🚀 Backend Started!!');
});
