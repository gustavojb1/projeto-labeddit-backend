import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostVotesDatabaseMock } from "../mocks/PostVotesDatabaseMock";
import { GetPostInputDTO, PostDTO } from "../../src/dtos/PostDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostBusiness} from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("getPosts", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock(),
        new PostDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostVotesDatabaseMock()
    )

    test("Retorna uma lista de posts", async () => {
        const input : GetPostInputDTO = {
            token: "token-mock-normal"
        }

        const result = await postBusiness.getPosts(input);

        expect(result.length).toBe(2);
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : GetPostInputDTO = {
            token: "invalid-token"
        }

        try {
            await postBusiness.getPosts(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })
})


