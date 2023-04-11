import { CreatePostInputDTO, GetPostInputDTO, GetPostOutputDTO, PostDTO } from "../dtos/PostDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenManager } from "../services/TokenManager";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CommentDB, UserDB } from "../types";
import { CommentDatabase } from "../database/CommentDatabase";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";



export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private commentDatabase: CommentDatabase,
    private postDTO: PostDTO,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
  ) { }

  public getCreator(userId: string, usersDB: UserDB[]) {
    const user = usersDB.find(userDB => userDB.id === userId) as UserDB;

    return {
      id: user.id,
      username: user.username
    }
  }

  public getComments(postId: string, usersDB: UserDB[], commentsDB: CommentDB[]) {
    let comments = commentsDB.filter(commentDB => commentDB.post_id === postId);

    const commentsMainInfo = comments.map(comment => {
      const creatorData = this.getCreator(comment.creator_id, usersDB);

      return {
        id: comment.id,
        content: comment.content,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        creator: {
          id: creatorData.id,
          username: creatorData.username
        }
      }
    })

    return commentsMainInfo;
  }


  public async getPosts(input: GetPostInputDTO): Promise<GetPostOutputDTO[]> {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postsDB = await this.postDatabase.findPosts();
    const usersDB = await this.userDatabase.findUsers();
    const commentsDB = await this.commentDatabase.findComments();

    const output = postsDB.map(postDB => {
      const post = new Post(
        postDB.id,
        postDB.content,
        postDB.upvotes,
        postDB.downvotes,
        postDB.created_at,
        postDB.updated_at,
        this.getCreator(postDB.creator_id, usersDB),
        this.getComments(postDB.id, usersDB, commentsDB)
      );

      return this.postDTO.getPostOutput(post);
    })

    return output;
  }

  public async createPost(input: CreatePostInputDTO): Promise<string> {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    if (content === "") {
      throw new BadRequestError("Escreva algo em seu Post");
    }

    const id = this.idGenerator.generate();
    const createdAt = (new Date()).toISOString();
    const upvotes = 0;
    const downvotes = 0;

    const newPost = new Post(
      id,
      content,
      upvotes,
      downvotes,
      createdAt,
      createdAt,
      {
        id: payload.id,
        username: payload.username
      },
      []
    )

    const newPostDB = newPost.toDBModel();
    await this.postDatabase.createPost(newPostDB);

    const output = "Post criado com sucesso";

    return output;
  }
}