import { BaseDatabase } from "../../src/database/BaseDatabase";
import { UserDB , USER_ROLES } from "../../src/types";

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users";

    public async findUsers() : Promise<UserDB[]>{
        return [
        {
            id: "id-mock-normal",
            username: "mocknormal",
            email: "mocknormal@email.com",
            password: "hash-bananinha",
            receive_emails: 0,
            role: USER_ROLES.NORMAL,
            created_at: new Date().toISOString()
        },
        {
            id:"id-mock-admin",
            username: "mockadmin",
            email: "mockadmin@email.com",
            password: "hash-bananinha",
            receive_emails: 0,
            role: USER_ROLES.ADMIN,
            created_at: new Date().toISOString()
        }
        ]
    }

    public async findUserById(id: string) : Promise<UserDB | undefined>{
        switch(id){
            case "id-mock-normal":
                return {
                    id: "id-mock-normal",
                    username: "mocknormal",
                    email: "mocknormal@email.com",
                    password: "hash-bananinha",
                    receive_emails: 0,
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString()
                }
            case "id-mock-admin":
                return {
                    id:"id-mock-admin",
                    username: "mockadmin",
                    email: "mockadmin@email.com",
                    password: "hash-bananinha",
                    receive_emails: 0,
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString()
                }
            default:
                return undefined;
        }
    }

    public async findUserByUsername(username: string) : Promise<UserDB | undefined>{
        switch(username){
            case "mocknormal":
                return {
                    id: "id-mock-normal",
                    username: "mocknormal",
                    email: "mocknormal@email.com",
                    password: "hash-bananinha",
                    receive_emails: 0,
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString()
                }
            case "mockadmin":
                return {
                    id:"id-mock-admin",
                    username: "mockadmin",
                    email: "mockadmin@email.com",
                    password: "hash-bananinha",
                    receive_emails: 0,
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString()
                }
            default:
                return undefined;
        }
    }

    public async findUserByEmail(email: string) : Promise<UserDB | undefined>{
        switch(email){
            case "mocknormal@email.com":
                return {
                    id: "id-mock-normal",
                    username: "mocknormal",
                    email: "mocknormal@email.com",
                    password: "hash-bananinha",
                    receive_emails: 0,
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString()
                }
            case "mockadmin@email.com":
                return {
                    id:"id-mock-admin",
                    username: "mockadmin",
                    email: "mockadmin@email.com",
                    password: "hash-bananinha",
                    receive_emails: 0,
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString()
                }
            default:
                return undefined;
        }
    }

    public async createUser(newUserDB : UserDB) : Promise<void>{
        
    }

    public async deleteUserById(id: string) : Promise<void>{

    }
}