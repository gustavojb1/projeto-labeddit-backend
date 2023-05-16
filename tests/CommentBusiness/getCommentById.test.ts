import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentVotesDatabaseMock } from "../mocks/CommentVotesDatabaseMock";
import { CommentDTO, GetCommentByIdInputDTO } from "../../src/dtos/CommentDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("getCommentById", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new CommentVotesDatabaseMock()
    );

    test("Retorna um comentário correspondente a um id", async () => {
        const input : GetCommentByIdInputDTO = {
            token: "token-mock-normal",
            id: "id-comment-1"
        }

        const result = await commentBusiness.getCommentById(input);

        expect(result.id).toBe("id-comment-1");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : GetCommentByIdInputDTO = {
            token: "invalid-token",
            id: "id-comment-1"
        }

        try {
            await commentBusiness.getCommentById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })

    test("Não há um comentário com esse id", async () => {
        expect.assertions(1);

        const input : GetCommentByIdInputDTO = {
            token: "token-mock-normal",
            id: "not-found-id"
        }

        try {
            await commentBusiness.getCommentById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não foi encontrado um comment com esse 'id'");
            }
        }
    })
});