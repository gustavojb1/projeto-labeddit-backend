import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { UserDTO } from "../dtos/UserDTO";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new UserDTO(),
    new TokenManager(),
    new IdGenerator(),
    new HashManager()
  ), 
  new UserDTO()
);

export const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", userController.createUser);
userRouter.post("/login", userController.loginUser);