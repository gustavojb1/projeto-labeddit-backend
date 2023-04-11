import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CommentDatabase } from "../database/CommentDatabase";
import { PostDTO } from "../dtos/PostDTO";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";

const postController = new PostController(
  new PostBusiness(
    new PostDatabase(),
    new UserDatabase(),
    new CommentDatabase(),
    new PostDTO(),
    new TokenManager(),
    new IdGenerator()
  ),
  new PostDTO()
);

export const postRouter = express.Router();

postRouter.get("/", postController.getPosts);
postRouter.post("/", postController.createPost);
postRouter.get("/:id", postController.getPostById);

