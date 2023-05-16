import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostVotesDatabaseMock } from "../mocks/PostVotesDatabaseMock";
import { EditPostVoteInputDTO, PostDTO } from "../../src/dtos/PostDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostBusiness} from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("updatePostVoteById", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock(),
        new PostDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostVotesDatabaseMock()
    );

    test("Atualizar vote de um post 1", async () => {
        const input : EditPostVoteInputDTO = {
            token: "token-mock-normal",
            vote: true,
            id: "id-post-1"
        }

        const result = await postBusiness.updatePostVoteById(input);

        expect(result).toBe("Vote atualizado com sucesso");
    })

    test("Atualizar vote de um post 2", async () => {
        const input : EditPostVoteInputDTO = {
            token: "token-mock-normal",
            vote: false,
            id: "id-post-1"
        }

        const result = await postBusiness.updatePostVoteById(input);

        expect(result).toBe("Vote atualizado com sucesso");
    })

    test("Atualizar vote de um post 3", async () => {
        const input : EditPostVoteInputDTO = {
            token: "token-mock-admin",
            vote: true,
            id: "id-post-1"
        }

        const result = await postBusiness.updatePostVoteById(input);

        expect(result).toBe("Vote atualizado com sucesso");
    })

    test("Atualizar vote de um post 4", async () => {
        const input : EditPostVoteInputDTO = {
            token: "token-mock-admin",
            vote: false,
            id: "id-post-1"
        }

        const result = await postBusiness.updatePostVoteById(input);

        expect(result).toBe("Vote atualizado com sucesso");
    })

    test("Atualizar vote de um post 5", async () => {
        const input : EditPostVoteInputDTO = {
            token: "token-mock-admin",
            vote: false,
            id: "id-post-2"
        }

        const result = await postBusiness.updatePostVoteById(input);

        expect(result).toBe("Vote atualizado com sucesso");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : EditPostVoteInputDTO = {
            token: "invalid-token",
            vote: false,
            id: "id-post-1"
        }

        try {
            await postBusiness.updatePostVoteById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })

    test("Não há um post com esse id", async () => {
        expect.assertions(1);

        const input : EditPostVoteInputDTO = {
            token: "token-mock-normal",
            vote: false,
            id: "not-found-id"
        }

        try {
            await postBusiness.updatePostVoteById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não foi encontrado um post com esse 'id'");
            }
        }
    })
})