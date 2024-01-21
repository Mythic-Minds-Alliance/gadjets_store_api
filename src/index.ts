import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {getProducts} from './products/products.controller';

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Welcome to gadjets store');
// });

app.get('/products', getProducts);

app.listen(process.env.PORT, () => {
  console.log(
    `Server started on ${process.env.SERVER_HOST}:${process.env.PORT}`
  );
});
