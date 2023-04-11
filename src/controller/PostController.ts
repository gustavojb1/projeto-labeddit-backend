import { Request , Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostDTO } from "../dtos/PostDTO";
import { BaseError } from "../errors/BaseError";



export class PostController {
  constructor(
    private postBusiness : PostBusiness,
    private postDTO : PostDTO
  ){}

  public getPosts = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;

        const input = this.postDTO.getPostInput(token);
        const output = await this.postBusiness.getPosts(input);

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
}