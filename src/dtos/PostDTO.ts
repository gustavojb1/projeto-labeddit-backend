import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { PostVote } from "../models/PostVote"


//INTERFACES
export interface GetPostInputDTO {
  token: string
}

export interface GetPostOutputDTO {
  id: string
  content: string
  upvotes: number
  downvotes: number
  createdAt: string
  updatedAt: string
  creator: {
    id: string,
    username: string
  }
  comments: {
    id: string
    content: string
    upvotes: number
    downvotes: number
    creator: {
      id: string
      username: string
    }
  }[]
}

export interface CreatePostInputDTO {
  content: string
  token: string
}

export interface GetPostByIdInputDTO {
  id: string
  token: string
}

export interface GetPostVoteInputDTO {
  token: string
}

export interface GetPostVoteOutputDTO {
  userId: string
  postId: string
  vote: number
}

export interface EditPostVoteInputDTO {
  id: string
  vote: boolean
  token: string
}

export interface EditPostInputDTO {
  id: string
  content: string
  token: string
}

export interface DeletePostInputDTO {
  id: string
  token: string
}


// CLASSES
export class PostDTO {
  getPostInput = (token: unknown): GetPostInputDTO => {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetPostInputDTO = {
      token
    }

    return result;
  }

  getPostOutput = (post: Post): GetPostOutputDTO => {
    const result: GetPostOutputDTO = {
      id: post.getId(),
      content: post.getContent(),
      upvotes: post.getUpvotes(),
      downvotes: post.getDownvotes(),
      createdAt: post.getCreatedAt(),
      updatedAt: post.getCreatedAt(),
      creator: post.getCreator(),
      comments: post.getComments()
    }

    return result;
  }

  createPostInput = (content: unknown, token: unknown): CreatePostInputDTO => {
    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser uma string");
    }

    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: CreatePostInputDTO = {
      content,
      token
    }

    return result;
  }

  getPostByIdInput = (token: unknown, id: string): GetPostByIdInputDTO => {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetPostByIdInputDTO = {
      id,
      token
    }

    return result;
  }

  getPostVoteInput = (token: unknown): GetPostVoteInputDTO => {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetPostVoteInputDTO = {
      token
    }

    return result;
  }

  getPostVoteOutput = (postVote: PostVote): GetPostVoteOutputDTO => {
    const result: GetPostVoteOutputDTO = {
      userId: postVote.getUserId(),
      postId: postVote.getPostId(),
      vote: postVote.getVote()
    }

    return result;
  }

  editPostVoteInput = (id: string, vote: unknown, token: unknown): EditPostVoteInputDTO => {
    if (typeof vote !== "boolean") {
      throw new BadRequestError("'vote' deve ser um boolean");
    }
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: EditPostVoteInputDTO = {
      id,
      vote,
      token
    }

    return result;
  }

  editPostInput = (id: string, content: unknown, token: unknown): EditPostInputDTO => {
    // id é string pois path param

    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser uma string");
    }
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: EditPostInputDTO = {
      id,
      content,
      token
    }

    return result;
  }

  deletePostInput = (id: string, token: unknown): DeletePostInputDTO => {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: DeletePostInputDTO = {
      id,
      token
    }

    return result;
  }
}