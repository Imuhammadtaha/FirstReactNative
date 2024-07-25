import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

//DOT ENV CONFIGURATION
dotenv.config();
connectDB();
//Rest Object
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routing
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", postRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
