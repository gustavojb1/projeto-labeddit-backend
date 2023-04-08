import { USER_ROLES } from "../types";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";




export interface GetUserInputDTO {
  token: string
}

export interface GetUserOutputDTO {
  id: string
  username: string
  role: USER_ROLES
}

export class UserDTO {
  getUserInput(token : unknown){
    if (typeof token !== "string"){
        throw new BadRequestError("Token inválido");
    }

    const result : GetUserInputDTO = {
        token
    }

    return result;
}

getUserOutput(user: User) : GetUserOutputDTO {
  const result : GetUserOutputDTO = {
      id: user.getId(),
      username: user.getUsername(),
      role: user.getRole()
  }

  return result;
}
}