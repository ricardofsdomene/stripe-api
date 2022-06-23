import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/Auth";
import productRoutes from "./routes/Product";
import customerRoutes from "./routes/Customer";
import checkoutRoutes from "./routes/Checkout";

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const server = `mongodb+srv://${user}:${password}@cluster0.gydj0sv.mongodb.net/${database}?retryWrites=true&w=majority`;

const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(server, config).then(() => {
  console.log("Database connection successfully!");
});

const port = 5556;

app.use(`/account`, authRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/checkout", checkoutRoutes);

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
