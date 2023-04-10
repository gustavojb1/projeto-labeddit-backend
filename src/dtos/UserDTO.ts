import { USER_ROLES } from "../types";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";


//INTERFACES

export interface GetUserInputDTO {
  token: string
}

export interface GetUserOutputDTO {
  id: string
  username: string
  role: USER_ROLES
}

export interface CreateUserInputDTO {
  username: string
  email: string
  password: string
  receiveEmails: boolean
}

export interface CreateUserOutputDTO {
  token: string
  userId: string
}

export interface LoginUserInputDTO {
  email: string
  password: string
}

export interface LoginUserOutputDTO {
  token: string
  userId: string
}


//CLASS

export class UserDTO {
  getUserInput(token: unknown) {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetUserInputDTO = {
      token
    }

    return result;
  }

  getUserOutput(user: User): GetUserOutputDTO {
    const result: GetUserOutputDTO = {
      id: user.getId(),
      username: user.getUsername(),
      role: user.getRole()
    }

    return result;
  }

  createUserInput(username: unknown, email: unknown, password: unknown, receiveEmails: number): CreateUserInputDTO {
    if (typeof username !== "string") {
      throw new BadRequestError("'username' precisa ser uma string");
    }

    if (username.length < 2) {
      throw new BadRequestError("'username' precisa ter no mínimo 2 caracteres");
    }

    if (typeof email !== "string") {
      throw new BadRequestError("'email' precisa ser uma string");
    }

    if (typeof password !== "string") {
      throw new BadRequestError("'password' precisa ser uma string");
    }

    if (typeof receiveEmails !== "boolean") {
      throw new BadRequestError("'receiveEmails' precisa ser um boolean");
    }

    const result: CreateUserInputDTO = {
      username,
      email,
      password,
      receiveEmails
    }

    return result;
  }

  createUserOutput(token: string, userId: string): CreateUserOutputDTO {
    const result: CreateUserOutputDTO = {
      token,
      userId
    }

    return result;
  }

  loginUserInput(email: unknown, password: unknown) : LoginUserInputDTO {
    if (typeof email !== "string"){
        throw new BadRequestError("'email' deve ser string");
    }

    if (typeof password !== "string"){
        throw new BadRequestError("'password' deve ser string");
    }

    const result : LoginUserInputDTO = {
        email,
        password
    }

    return result;
}
}