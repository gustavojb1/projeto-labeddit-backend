import { CommentVoteDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentVotesDatabase extends BaseDatabase {
  public static TABLE_COMMENT_VOTES = "comment_votes";

  public async findCommentVotes() {
    const result: CommentVoteDB[] = await BaseDatabase
      .connection(CommentVotesDatabase.TABLE_COMMENT_VOTES);
    return result;
  }

  public async findVoteByUserAndCommentId(user_id: string, comment_id: string) {
    const [result]: CommentVoteDB[] | undefined[] = await BaseDatabase
      .connection(CommentVotesDatabase.TABLE_COMMENT_VOTES)
      .where({ user_id, comment_id });

    return result;
  }

  public async createVote(newVoteDB: CommentVoteDB) {
    await BaseDatabase
      .connection(CommentVotesDatabase.TABLE_COMMENT_VOTES)
      .insert(newVoteDB);
  }

  public async deleteVoteByUserAndCommentId(user_id: string, comment_id: string) {
    await BaseDatabase
      .connection(CommentVotesDatabase.TABLE_COMMENT_VOTES)
      .del()
      .where({ user_id, comment_id });
  }

  public async updateVoteByUserAndCommentId(updatedVoteDB: CommentVoteDB, user_id: string, comment_id: string) {
    await BaseDatabase
      .connection(CommentVotesDatabase.TABLE_COMMENT_VOTES)
      .update(updatedVoteDB)
      .where({ user_id, comment_id });
  }
}