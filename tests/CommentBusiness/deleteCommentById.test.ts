import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentVotesDatabaseMock } from "../mocks/CommentVotesDatabaseMock";
import { CommentDTO, DeleteCommentInputDTO } from "../../src/dtos/CommentDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { ForbidenError } from "../../src/errors/ForbiddenError";

describe("deleteCommentById", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new CommentVotesDatabaseMock()
    );

    test("Deleta comentário com sucesso", async () => {
        const input : DeleteCommentInputDTO = {
            token: "token-mock-admin",
            id: "id-comment-1"
        }

        const result = await commentBusiness.deleteCommentById(input);

        expect(result).toBe("Comment deletado com sucesso");
    });

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : DeleteCommentInputDTO = {
            token: "invalid-token",
            id: "id-comment-1"
        }

        try {
            await commentBusiness.deleteCommentById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    });

    test("Não há um comentário com esse id", async () => {
        expect.assertions(1);

        const input : DeleteCommentInputDTO = {
            token: "token-mock-admin",
            id: "not-found-id"
        }

        try {
            await commentBusiness.deleteCommentById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não existe um comment com esse id");
            }
        }
    });

    test("Só admins podem deletar comentários", async () => {
        expect.assertions(1);

        const input : DeleteCommentInputDTO = {
            token: "token-mock-normal",
            id: "id-comment-1"
        }

        try {
            await commentBusiness.deleteCommentById(input);
        } catch (error) {
            if (error instanceof ForbidenError){
                expect(error.message).toBe("Você não tem permissão para realizar essa ação");
            }
        }
    });
});