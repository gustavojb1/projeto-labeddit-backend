import { UserDatabase } from "../database/UserDatabase";
// import { CreateUserInputDTO, CreateUserOutputDTO, DeleteUserInputDTO, GetUserByIdInputDTO, GetUserInputDTO, GetUserOutputDTO, LoginUserInputDTO, LoginUserOutputDTO, UserDTO } from "../dtos/UserDTO";
import { GetUserInputDTO, GetUserOutputDTO, UserDTO } from "../dtos/UserDTO";
import { TokenManager } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";




export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private userDTO: UserDTO,
    private tokenManager: TokenManager,
){}

public async getUsers(input : GetUserInputDTO) : Promise<GetUserOutputDTO[]>{
  const { token } = input;
  const usersDB = await this.userDatabase.findUsers();

  const payload = this.tokenManager.getPayload(token);
  if (payload === null){
      throw new BadRequestError("Token inválido");
  }

  const output = usersDB.map(userDB => {
      const user = new User(
          userDB.id,
          userDB.username,
          userDB.email,
          userDB.password,
          userDB.receive_emails,
          userDB.role,
          userDB.created_at
      )

      return this.userDTO.getUserOutput(user)
  });

  return output;
}
}