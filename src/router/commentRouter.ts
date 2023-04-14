import express from "express";
import { CommentController } from "../controller/CommentController";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentDTO } from "../dtos/CommentDTO";
import { CommentDatabase } from "../database/CommentDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { PostDatabase } from "../database/PostDatabase";



const commentController = new CommentController(
  new CommentBusiness(
    new CommentDatabase(),
    new UserDatabase(),
    new CommentDTO(),
    new TokenManager(),
    new IdGenerator(),
    new PostDatabase()
  ),
  new CommentDTO(),
)

export const commentRouter = express.Router();

commentRouter.get("/", commentController.getComments);
commentRouter.post("/", commentController.createComment);