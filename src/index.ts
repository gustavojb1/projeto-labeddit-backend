import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./router/userRouter";
import { postRouter } from "./router/postRouter";
import { commentRouter } from "./router/commentRouter";

// dotenv
dotenv.config();

// express
const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Configuração da Porta
app.listen(Number(process.env.PORT || 3003), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
})