import { CommentVoteDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentVotesDatabase extends BaseDatabase {
  public static TABLE_COMMENT_VOTES = "comment_votes";

  public async findCommentVotes() {
    const result: CommentVoteDB[] = await BaseDatabase
      .connection(CommentVotesDatabase.TABLE_COMMENT_VOTES);
    return result;
  }
}