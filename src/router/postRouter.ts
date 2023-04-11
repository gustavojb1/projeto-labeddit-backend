import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CommentDatabase } from "../database/CommentDatabase";
import { PostDTO } from "../dtos/PostDTO";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { PostVotesDatabase } from "../database/PostVotesDatabase";

const postController = new PostController(
  new PostBusiness(
    new PostDatabase(),
    new UserDatabase(),
    new CommentDatabase(),
    new PostDTO(),
    new TokenManager(),
    new IdGenerator(),
    new PostVotesDatabase()
  ),
  new PostDTO()
);

export const postRouter = express.Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/votes", postController.getPostVotes);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/", postController.createPost);
postRouter.put("/:id/vote", postController.updatePostVoteById);

