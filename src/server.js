import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import ProductManager from "./managers/productManager.js";

const app = express();
const productManager = new ProductManager(`${__dirname}/db/products.json`)

app.use(express.static(`${__dirname}/public`))

// handlebars middleware
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const port = 8080;

const httpServer = app.listen(port, () =>
  console.log(`listening port ${port}`)
);

const socketServer = new Server(httpServer)

// SOCKET SerVER
socketServer.on("connection", async (socket)=>{
  try {
    console.log(`new client ${socket.id}`);

    socket.on("disconnect", () => console.log(`client disconnected`));

    // send all products to show realtime
    socket.emit("productList", await productManager.getProducts());

    // delete product in realtime
    socket.on('deleteProduct', async (prodId)=>{
      try {
        await productManager.deleteProduct(prodId)
      } catch (error) {
        
      }
    })


    // add products
    socket.on('addProduct', async (prodInfo)=>{
      await productManager.addProducts(prodInfo)
    })


  } catch (error) {
    console.log(error);
  }
})
