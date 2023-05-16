import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentVotesDatabaseMock } from "../mocks/CommentVotesDatabaseMock";
import { CommentDTO, EditCommentInputDTO } from "../../src/dtos/CommentDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { ForbidenError } from "../../src/errors/ForbiddenError";

describe("updateCommentById", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new CommentVotesDatabaseMock()
    );

    test("Atualiza o comentário com sucesso", async () => {
        const input : EditCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            id: "id-comment-1",
            token: "token-mock-admin"
        };

        const result = await commentBusiness.updateCommentById(input);

        expect(result).toBe("Comment atualizado com sucesso");
    });

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : EditCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            id: "id-comment-1",
            token: "invalid-token"
        };

        try {
            await commentBusiness.updateCommentById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    });

    test("Não há um comentário com esse id", async () => {
        expect.assertions(1);

        const input : EditCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            id: "not-found-id",
            token: "token-mock-admin"
        };

        try {
            await commentBusiness.updateCommentById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não foi encontrado um comment com esse 'id'");
            }
        }
    });

    test("Só admins podem editar comentários", async () => {
        expect.assertions(1);

        const input : EditCommentInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            id: "id-comment-1",
            token: "token-mock-normal"
        };

        try {
            await commentBusiness.updateCommentById(input);
        } catch (error) {
            if (error instanceof ForbidenError){
                expect(error.message).toBe("Somente admins podem editar posts");
            }
        }
    })
});