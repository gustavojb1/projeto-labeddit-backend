import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../mocks/CommentDatabaseMock";
import { PostVotesDatabaseMock } from "../mocks/PostVotesDatabaseMock";
import { EditPostInputDTO, PostDTO } from "../../src/dtos/PostDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { PostBusiness} from "../../src/business/PostBusiness";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";
import { ForbidenError } from "../../src/errors/ForbiddenError";

describe("updatePostById", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new CommentDatabaseMock(),
        new PostDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new PostVotesDatabaseMock()
    );

    test("Post é atualizado com sucesso", async () => {
        const input : EditPostInputDTO = {
            token: "token-mock-admin",
            content: "An updated content.",
            id: "id-post-1"
        };

        const result = await postBusiness.updatePostById(input);

        expect(result).toBe("Post atualizado com sucesso");
    })

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : EditPostInputDTO = {
            token: "invalid-token",
            content: "An updated content.",
            id: "id-post-1"
        };

        try {
            await postBusiness.updatePostById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    })

    test("Não há um post com esse id", async () => {
        expect.assertions(1);

        const input : EditPostInputDTO = {
            token: "token-mock-admin",
            content: "An updated content.",
            id: "not-found-id"
        };

        try {
            await postBusiness.updatePostById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não foi encontrado um post com esse id");
            }
        }
    })

    test("Só admins podem editar posts", async () => {
        expect.assertions(1);

        const input : EditPostInputDTO = {
            token: "token-mock-normal",
            content: "An updated content.",
            id: "id-post-1"
        };

        try {
            await postBusiness.updatePostById(input);
        } catch (error) {
            if (error instanceof ForbidenError){
                expect(error.message).toBe("Somente administradores podem editar posts");
            }
        }
    })
})