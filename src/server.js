import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handlebars middleware
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const port = 8080;

const httpServer = app.listen(port, () =>
  console.log(`listening port ${port}`)
);

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket)=>{

  console.log(`new client ${socket.id}`);

  socket.on("hellofromfront", (arg)=>{
    console.log(arg);
  });
})
