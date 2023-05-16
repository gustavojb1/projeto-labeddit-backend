import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentVotesDatabaseMock } from "../mocks/CommentVotesDatabaseMock";
import { CommentDTO, CreateCommentInputDTO } from "../../src/dtos/CommentDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("createComment", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new CommentVotesDatabaseMock()
    );

    test("Cria comentário com sucesso", async () => {
        const input : CreateCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            token: "token-mock-normal",
            postId: "id-post-1"
        };

        const result = await commentBusiness.createComment(input);

        expect(result).toBe("Comment criado com sucesso");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : CreateCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            token: "invalid-token",
            postId: "id-post-1"
        };

        try {
            await commentBusiness.createComment(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })

    test("Não há um post com esse id", async () => {
        expect.assertions(1);

        const input : CreateCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            token: "token-mock-normal",
            postId: "not-found-id"
        };

        try {
            await commentBusiness.createComment(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não existe um post com esse 'id'");
            }
        }
    })
})