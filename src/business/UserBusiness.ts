import { UserDatabase } from "../database/UserDatabase";
// import { CreateUserInputDTO, CreateUserOutputDTO, DeleteUserInputDTO, GetUserByIdInputDTO, GetUserInputDTO, GetUserOutputDTO, LoginUserInputDTO, LoginUserOutputDTO, UserDTO } from "../dtos/UserDTO";
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserInputDTO, GetUserOutputDTO, UserDTO } from "../dtos/UserDTO";
import { TokenPayload, USER_ROLES } from "../types";
import { TokenManager } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";


export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private userDTO: UserDTO,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
    private hashManager: HashManager
){}


//GET ALL USERS
public async getUsers(input : GetUserInputDTO) : Promise<GetUserOutputDTO[]>{
  const { token } = input;
  const usersDB = await this.userDatabase.findUsers();

  const payload = this.tokenManager.getPayload(token);
  if (payload === null){
      throw new BadRequestError("Token inválido");
  }
  console.log(payload)
  if (payload.role !== "ADMIN"){
    throw new BadRequestError("Usuário sem permissão");
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

//SIGNUP - CREATE USER
public async createUser(input : CreateUserInputDTO) : Promise<CreateUserOutputDTO>{
  const { username , email , password , receiveEmails } = input;

  const userDBUsername = await this.userDatabase.findUserByUsername(username);
  if (userDBUsername){
      throw new BadRequestError("Já existe um user com esse 'username'");
  }

  const userDBEmail = await this.userDatabase.findUserByEmail(email);
  if (userDBEmail){
      throw new BadRequestError("Já existe um user com esse 'email'");
  }

  const id = this.idGenerator.generate();
  const createdAt = (new Date()).toISOString();
  const role = USER_ROLES.NORMAL;
  const hashedPassword = await this.hashManager.hash(password);

  const newUser = new User (id, username, email, hashedPassword, Number(receiveEmails), role, createdAt);

  const tokenPayload : TokenPayload = {
      id: newUser.getId(),
      username: newUser.getUsername(),
      role: newUser.getRole()
  }

  const token = this.tokenManager.createToken(tokenPayload);

  const newUserDB = newUser.toDBModel();
  await this.userDatabase.createUser(newUserDB);

  const userId = newUser.getId();

  const output = this.userDTO.createUserOutput(token, userId);

  return output;
}
}