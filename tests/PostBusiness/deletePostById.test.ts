import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostVotesDatabaseMock } from "../mocks/PostVotesDatabaseMock";
import { DeletePostInputDTO, PostDTO } from "../../src/dtos/PostDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostBusiness} from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { ForbidenError } from "../../src/errors/ForbiddenError";

describe("deletePostById", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock(),
        new PostDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostVotesDatabaseMock()
    );

    test("Deleta um post com sucesso", async () => {
        const input : DeletePostInputDTO = {
            id: "id-post-1",
            token: "token-mock-admin"
        };

        const result = await postBusiness.deletePostById(input);

        expect(result).toBe("Post deletado com sucesso");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : DeletePostInputDTO = {
            id: "id-post-1",
            token: "invalid-token"
        };

        try {
            await postBusiness.deletePostById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    });

    test("Não há um post com esse id", async () => {
        expect.assertions(1);

        const input : DeletePostInputDTO = {
            id: "not-found-id",
            token: "token-mock-admin"
        };

        try {
            await postBusiness.deletePostById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não existe um post com esse 'id'");
            }
        }
    });

    test("Só admins podem deletar posts", async () => {
        expect.assertions(1);

        const input : DeletePostInputDTO = {
            id: "id-post-1",
            token: "token-mock-normal"
        };

        try {
            await postBusiness.deletePostById(input);
        } catch (error) {
            if (error instanceof ForbidenError){
                expect(error.message).toBe("Você não tem permissão para realizar essa ação");
            }
        }
    });
})