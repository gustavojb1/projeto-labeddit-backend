import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostVotesDatabaseMock } from "../mocks/PostVotesDatabaseMock";
import { GetPostByIdInputDTO, GetPostInputDTO, PostDTO } from "../../src/dtos/PostDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostBusiness} from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("getPostById", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock(),
        new PostDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostVotesDatabaseMock()
    );

    test("Retorna o post que corresponde a um id", async () => {
        const input : GetPostByIdInputDTO = {
            token: "token-mock-normal",
            id: "id-post-1"
        }

        const result = await postBusiness.getPostById(input);

        expect(result.creator).toEqual({
            id: "id-mock-normal",
            username: "mocknormal"
        })

        expect(result.id).toBe("id-post-1");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : GetPostByIdInputDTO = {
            token: "invalid-token",
            id: "id-post-1"
        }

        try {
            await postBusiness.getPostById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })

    test("Não há um post com esse id", async () => {
        expect.assertions(1);

        const input : GetPostByIdInputDTO = {
            token: "token-mock-normal",
            id: "not-found-id"
        }

        try {
            await postBusiness.getPostById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não foi encontrado um post com esse 'id'");
            }
        }
    })
})