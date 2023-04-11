import { PostVoteDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostVotesDatabase extends BaseDatabase {
  public static TABLE_POST_VOTES = "post_votes"

  public async findPostVotes() {
    const result: PostVoteDB[] = await BaseDatabase
      .connection(PostVotesDatabase.TABLE_POST_VOTES);
    return result;
  }

  public async findVoteByUserAndPostId(user_id: string, post_id: string) {
    const [result]: PostVoteDB[] | undefined[] = await BaseDatabase
      .connection(PostVotesDatabase.TABLE_POST_VOTES)
      .where({ user_id, post_id });

    return result;
  }

  public async createVote(newVoteDB: PostVoteDB) {
    await BaseDatabase
      .connection(PostVotesDatabase.TABLE_POST_VOTES)
      .insert(newVoteDB);
  }

  public async deleteVoteByUserAndPostId(user_id: string, post_id: string) {
    await BaseDatabase
      .connection(PostVotesDatabase.TABLE_POST_VOTES)
      .del()
      .where({ user_id, post_id });
  }

  public async updateVoteByUserAndPostId(updatedVoteDB: PostVoteDB, user_id: string, post_id: string) {
    await BaseDatabase
      .connection(PostVotesDatabase.TABLE_POST_VOTES)
      .update(updatedVoteDB)
      .where({ user_id, post_id });
  }
}