import { BadRequestError } from "../errors/BadRequestError";
import { Comment } from "../models/Comment";


//INTERFACES 

export interface GetCommentInputDTO {
  token: string
}

export interface GetCommentOutputDTO {
  id: string,
  content: string,
  upvotes: number,
  downvotes: number,
  createdAt: string,
  updatedAt: string,
  creator: {
    id: string,
    username: string
  },
  postId: string
}

export interface CreateCommentInputDTO {
  content: string,
  token: string,
  postId: string
}

export interface GetCommentByIdInputDTO {
  token: string
  id: string
}

//CLASSES
export class CommentDTO {
  getCommentInput = (token: unknown): GetCommentInputDTO => {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetCommentInputDTO = {
      token
    }

    return result;
  }

  getCommentOutput = (comment: Comment): GetCommentOutputDTO => {
    const result: GetCommentOutputDTO = {
      id: comment.getId(),
      content: comment.getContent(),
      upvotes: comment.getUpvotes(),
      downvotes: comment.getDownvotes(),
      createdAt: comment.getCreatedAt(),
      updatedAt: comment.getUpdatedAt(),
      creator: comment.getCreator(),
      postId: comment.getPostId()
    }

    return result;
  }

  createCommentInput = (content: unknown, token: unknown, postId: unknown): CreateCommentInputDTO => {
    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser uma string");
    }

    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof postId !== "string") {
      throw new BadRequestError("'postId' deve ser uma string");
    }

    const result: CreateCommentInputDTO = {
      content,
      token,
      postId
    }

    return result;
  }

  getCommentByIdInput = (token: unknown, id: string): GetCommentByIdInputDTO => {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetCommentByIdInputDTO = {
      id,
      token
    }

    return result;
  }
}