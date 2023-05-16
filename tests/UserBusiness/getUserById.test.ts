import { UserBusiness } from "../../src/business/UserBusiness";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { GetUserByIdInputDTO, UserDTO } from "../../src/dtos/UserDTO";
import { USER_ROLES } from "../../src/types";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("getUserById", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new UserDTO(),
        new TokenManagerMock(),
        new IdGeneratorMock(),
        new HashManagerMock()
    );
    
    test("Retorna o usuário de acordo com seu id", async () => {
        const input : GetUserByIdInputDTO =  {
            id: "id-mock-normal",
            token: "token-mock-normal"
        };

        const response = await userBusiness.getUserById(input);

        expect(response).toEqual({
            id: "id-mock-normal",
            username: "mocknormal",
            role: USER_ROLES.NORMAL
        })
    });

    test("Token não é válido", async () => {
        expect.assertions(1);

        const input : GetUserByIdInputDTO =  {
            id: "id-mock-normal",
            token: "invalid-token"
        };

        try {
            await userBusiness.getUserById(input);
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("Token inválido");
            }   
        }
    })

    test("Não há um usuário com esse id", async () => {
        expect.assertions(1);

        const input : GetUserByIdInputDTO =  {
            id: "id-not-found",
            token: "token-mock-normal"
        };

        try {
            await userBusiness.getUserById(input);
        } catch (error) {
            if (error instanceof NotFoundError){
                expect(error.message).toBe("Não foi encontrado um user com esse 'id'");
            }
        }
    })
})