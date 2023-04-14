// import { CommentDTO, CreateCommentInputDTO, DeleteCommentInputDTO, EditCommentInputDTO, EditCommentVoteInputDTO, GetCommentByIdInputDTO, GetCommentInputDTO, GetCommentOutputDTO, GetCommentVoteInputDTO } from "../dtos/CommentDTO";
import { CommentDTO, GetCommentInputDTO, GetCommentOutputDTO, CreateCommentInputDTO } from "../dtos/CommentDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { CommentDatabase } from "../database/CommentDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { TokenManager } from "../services/TokenManager";
import { UserDB } from "../types";
import { Comment } from "../models/Comment";
import { NotFoundError } from "../errors/NotFoundError";
import { PostDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../services/IdGenerator";


export class CommentBusiness {
  constructor(
    private commentDatabase: CommentDatabase,
    private userDatabase: UserDatabase,
    private commentDTO: CommentDTO,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
    private postDatabase: PostDatabase,
  ) { }

  public async getComments(input: GetCommentInputDTO): Promise<GetCommentOutputDTO[]> {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const usersDB = await this.userDatabase.findUsers();
    const commentsDB = await this.commentDatabase.findComments();

    const output = commentsDB.map(commentDB => {
      const comment = new Comment(
        commentDB.id,
        commentDB.content,
        commentDB.upvotes,
        commentDB.downvotes,
        commentDB.created_at,
        commentDB.updated_at,
        getCreator(commentDB.creator_id),
        commentDB.post_id
      );

      return this.commentDTO.getCommentOutput(comment);
    })

    function getCreator(userId: string) {
      const user = usersDB.find(userDB => userDB.id === userId) as UserDB;

      return {
        id: user.id,
        username: user.username
      }
    }

    return output;
  }

  public async createComment(input: CreateCommentInputDTO): Promise<string> {
    const { content, token, postId } = input;

    if (content === '') {
      throw new BadRequestError("Escreva algo em seu Comentário");
    }

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.postDatabase.findPostById(postId);
    if (!postDB) {
      throw new NotFoundError("Não existe um post com esse 'id'");
    }

    const id = this.idGenerator.generate();
    const createdAt = (new Date()).toISOString();
    const upvotes = 0;
    const downvotes = 0;
    const newComment = new Comment(
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
      postId
    )

    const newCommentDB = newComment.toDBModel();
    await this.commentDatabase.createComment(newCommentDB);

    const output = "Comment criado com sucesso";
    return output;
  }
}