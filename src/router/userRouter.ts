import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { UserDTO } from "../dtos/UserDTO";
import { TokenManager } from "../services/TokenManager";

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new UserDTO(),
    new TokenManager()
  ), 
  new UserDTO()
);

export const userRouter = express.Router();

userRouter.get("/", userController.getUsers);