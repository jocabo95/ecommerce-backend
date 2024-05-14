import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);

const port = 8080;

app.listen(port, () => console.log(`listening port ${port}`));
