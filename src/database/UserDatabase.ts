import { BaseDatabase } from "./BaseDatabase";
import { UserDB } from "../types";



export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers() {
    const usersDB: UserDB[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS);

    return usersDB;
  }

  public async findUserByUsername(username: string) {
    const [result]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ username });
    return result;
  }

  public async findUserByEmail(email: string) {
    const [result]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ email });
    return result;
  }

  public async createUser(newUserDB: UserDB) {
    await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .insert(newUserDB);
  }

  public async findUserById(id: string) {
    const [result]: UserDB[] | undefined[] = await BaseDatabase
      .connection(UserDatabase.TABLE_USERS)
      .where({ id });
    return result;
  }

  public async deleteUserById(id: string){
    await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .del()
        .where({ id });
}
}