import { BaseDatabase } from "./BaseDatabase";
import { PostDB } from "../types";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts";

  public async findPosts() {
    const result: PostDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS);
    return result;
  }
}