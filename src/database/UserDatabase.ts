import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";



export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(){
    const usersDB : UserDB[] = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS);

    return usersDB;
}
}