import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import productsRoutes from "./routes/products.js";
import "./config/passport.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api", routes);
app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
