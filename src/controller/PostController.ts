import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostDTO } from "../dtos/PostDTO";
import { BaseError } from "../errors/BaseError";



export class PostController {
  constructor(
    private postBusiness: PostBusiness,
    private postDTO: PostDTO
  ) { }

  // GET ALL POSTS
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

  // CREATE POST
  public createPost = async (req: Request, res: Response) => {
    try {
      const content = req.body.content;
      const token = req.headers.authorization;

      const input = this.postDTO.createPostInput(content, token);
      await this.postBusiness.createPost(input);

      res.status(201).send("Post criado com sucesso");
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  // GET POST BY ID
  public getPostById = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const id = req.params.id;

      const input = this.postDTO.getPostByIdInput(token, id);
      const output = await this.postBusiness.getPostById(input);

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

  // GET POST VOTES
  public getPostVotes = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.postDTO.getPostVoteInput(token);
      const output = await this.postBusiness.getPostVotes(input);

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

  // UPDATE POST VOTE BY ID
  public updatePostVoteById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const vote = req.body.vote;
      const token = req.headers.authorization;

      const input = this.postDTO.editPostVoteInput(id, vote, token);
      await this.postBusiness.updatePostVoteById(input);

      res.status(200).send("Vote atualizado com sucesso");
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  // UPDATE POST BY ID
  public updatePostById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const content = req.body.content;
      const token = req.headers.authorization;

      const input = this.postDTO.editPostInput(id, content, token);
      await this.postBusiness.updatePostById(input);

      res.status(200).send("Post atualizado com sucesso");
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  //DELETE POST BY ID
  public deletePostById = async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const token = req.headers.authorization;

        const input = this.postDTO.deletePostInput(id, token);
        await this.postBusiness.deletePostById(input);

        res.status(200).send("Post deletado com sucesso");
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