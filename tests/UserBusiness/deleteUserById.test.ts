import { UserBusiness } from "../../src/business/UserBusiness";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { DeleteUserInputDTO, UserDTO } from "../../src/dtos/UserDTO";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { ForbidenError } from "../../src/errors/ForbiddenError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("deleteUserById", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new UserDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new HashManagerMock()
    );

    test("Deleta o usuário com o id informado", async () => {
        const input : DeleteUserInputDTO = {
            id: "id-mock-normal",
            token: "token-mock-admin"
        }

        const response = await userBusiness.deleteUserById(input);

        expect(response).toBe("User deletado com sucesso");
    });

    test("Token informado não é válido", async () => {
        expect.assertions(1);

        const input : DeleteUserInputDTO = {
            id: "id-mock-normal",
            token: "invalid-token"
        }

        try {
            await userBusiness.deleteUserById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }
        }
    });

    test("Apenas administradores podem deletar usuários", async () => {
        expect.assertions(1);

        const input : DeleteUserInputDTO = {
            id: "id-mock-normal",
            token: "token-mock-normal"
        }

        try {
            await userBusiness.deleteUserById(input);
        } catch (error) {
            if (error instanceof ForbidenError){
                expect(error.message).toBe("Apenas administradores podem deletar usuários");
            }
        }
    });

    test("Usuário deve existir para ser deletado", async () => {
        expect.assertions(1);

        const input : DeleteUserInputDTO = {
            id: "id-not-found",
            token: "token-mock-admin"
        }

        try {
            await userBusiness.deleteUserById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Usuário não encontrado");
            }
        }
    })
})