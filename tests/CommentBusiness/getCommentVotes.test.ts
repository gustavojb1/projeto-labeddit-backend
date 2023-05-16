import { CommentBusiness } from "../../src/business/CommentBusiness";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentVotesDatabaseMock } from "../mocks/CommentVotesDatabaseMock";
import { CommentDTO, GetCommentVoteInputDTO } from "../../src/dtos/CommentDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("getCommentVotes", () => {
    const commentBusiness = new CommentBusiness(
        new CommentDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostDatabaseMock(),
        new CommentVotesDatabaseMock()
    );

    test("Retorna os votes dos comentários", async () => {
        const input : GetCommentVoteInputDTO = {
            token: "token-mock-normal"
        }

        const result = await commentBusiness.getCommentVotes(input);

        expect(result.length).toBe(2);
    })

    test("Token inválido", async () => {
        expect.assertions(1);

        const input : GetCommentVoteInputDTO = {
            token: "invalid-token"
        }

        try {
            await commentBusiness.getCommentVotes(input);
        } catch (error) {
           if (error instanceof BadRequestError){
            expect(error.message).toBe("Token inválido");
           }
        }
    })
})