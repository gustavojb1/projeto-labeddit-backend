import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentVotesDatabaseMock } from "../mocks/CommentVotesDatabaseMock";
import { CommentDTO, EditCommentVoteInputDTO } from "../../src/dtos/CommentDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("updateCommentVoteById", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new CommentVotesDatabaseMock()
    );

    test("Atualiza vote do comment com sucesso 1", async () => {
        const input : EditCommentVoteInputDTO = {
            id: "id-comment-1",
            vote: true,
            token: "token-mock-normal"
        }

        const result = await commentBusiness.updateCommentVoteById(input);

        expect(result).toBe("Vote do comment atualizado com sucesso");
    })

    test("Atualiza vote do comment com sucesso 2", async () => {
        const input : EditCommentVoteInputDTO = {
            id: "id-comment-1",
            vote: false,
            token: "token-mock-normal"
        }

        const result = await commentBusiness.updateCommentVoteById(input);

        expect(result).toBe("Vote do comment atualizado com sucesso");
    })

    test("Atualiza vote do comment com sucesso 3", async () => {
        const input : EditCommentVoteInputDTO = {
            id: "id-comment-2",
            vote: false,
            token: "token-mock-normal"
        }

        const result = await commentBusiness.updateCommentVoteById(input);

        expect(result).toBe("Vote do comment atualizado com sucesso");
    })

    test("Atualiza vote do comment com sucesso 4", async () => {
        const input : EditCommentVoteInputDTO = {
            id: "id-comment-1",
            vote: true,
            token: "token-mock-admin"
        }

        const result = await commentBusiness.updateCommentVoteById(input);

        expect(result).toBe("Vote do comment atualizado com sucesso");
    })

    test("Atualiza vote do comment com sucesso 5", async () => {
        const input : EditCommentVoteInputDTO = {
            id: "id-comment-1",
            vote: false,
            token: "token-mock-admin"
        }

        const result = await commentBusiness.updateCommentVoteById(input);

        expect(result).toBe("Vote do comment atualizado com sucesso");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : EditCommentVoteInputDTO = {
            id: "id-comment-1",
            vote: true,
            token: "invalid-token"
        }

        try {
            await commentBusiness.updateCommentVoteById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })

    test("Não há comentário com esse id", async () => {
        expect.assertions(1);

        const input : EditCommentVoteInputDTO = {
            id: "not-found-id",
            vote: true,
            token: "token-mock-normal"
        }

        try {
            await commentBusiness.updateCommentVoteById(input);
        } catch (error) {
            if (error instanceof NotFoundError) {
                expect(error.message).toBe("Não foi encontrado um comment com esse 'id'");
            }
        }
    })
})