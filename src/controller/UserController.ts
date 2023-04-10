import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDTO } from "../dtos/UserDTO";
import { BaseError } from "../errors/BaseError";

export class UserController {
    constructor(
        private userBusiness: UserBusiness,
        private userDTO: UserDTO
    ) { }

    //GET ALL USERS
    public getUsers = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;

            const input = this.userDTO.getUserInput(token);
            const output = await this.userBusiness.getUsers(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //SIGNUP - CREATE USER
    public createUser = async (req: Request, res: Response) => {
        try {
            const { username, email, password, receiveEmails } = req.body;

            const input = this.userDTO.createUserInput(username, email, password, receiveEmails);
            const output = await this.userBusiness.createUser(input);

            res.status(201).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //LOGIN USER
    public loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const input = this.userDTO.loginUserInput(email, password);
            const output = await this.userBusiness.loginUser(input);

            res.status(200).send(output);
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //DELETE USER
    public deleteUserById = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const token = req.headers.authorization;

            const input = this.userDTO.deleteUserInput(token, id);
            const output = await this.userBusiness.deleteUserById(input);

            res.status(200).send("Usuário deletado com sucesso");
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            } 
        }
    }
}