import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"


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

//
export class PostDTO {
  getPostInput = (token: unknown) : GetPostInputDTO => {
    if (typeof token !== "string"){
        throw new BadRequestError ("Token inválido");
    }

    const result : GetPostInputDTO = {
        token
    }

    return result;
}

getPostOutput = (post: Post) : GetPostOutputDTO => {
    const result : GetPostOutputDTO = {
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
}