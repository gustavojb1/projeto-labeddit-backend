import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostVotesDatabaseMock } from "../mocks/PostVotesDatabaseMock";
import { CreatePostInputDTO , PostDTO } from "../../src/dtos/PostDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostBusiness} from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("createPost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock(),
        new PostDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostVotesDatabaseMock()
    );

    test("Cria um post com sucesso", async () => {
        const input : CreatePostInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            token: "token-mock-normal"
        }

        const result = await postBusiness.createPost(input);

        expect(result).toBe("Post criado com sucesso");
    });

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : CreatePostInputDTO = {
            content: "The brown fox jumps over the lazy dog",
            token: "invalid-token"
        }

        try {
            await postBusiness.createPost(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    });
})