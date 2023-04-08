import cors from "cors";
import express from "express";
import dotenv from "dotenv";


// dotenv
dotenv.config();

// express
const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRouter);

// Configuração da Porta
app.listen(Number(process.env.PORT || 3003), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
})