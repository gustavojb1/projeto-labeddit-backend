import { Request, Response } from "express";
import { CommentDTO } from "../dtos/CommentDTO";
import { CommentBusiness } from "../business/CommentBusiness";
import { BaseError } from "../errors/BaseError";




export class CommentController {
  constructor(
    private commentBusiness: CommentBusiness,
    private commentDTO: CommentDTO
  ) { }

  //GET ALL COMMENTS
  public getComments = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.commentDTO.getCommentInput(token);
      const output = await this.commentBusiness.getComments(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  //CREATE COMMENT
  public createComment = async (req: Request, res: Response) => {
    try {
      const content = req.body.content;
      const postId = req.body.postId;
      const token = req.headers.authorization;

      const input = this.commentDTO.createCommentInput(content, token, postId);
      await this.commentBusiness.createComment(input);

      res.status(201).send("Comentário criado com sucesso");
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}