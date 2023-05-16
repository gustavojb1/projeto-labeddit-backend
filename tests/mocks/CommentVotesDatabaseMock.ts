import { CommentVoteDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class CommentVotesDatabaseMock extends BaseDatabase {
    public TABLE_COMMENT_VOTES = "comment_votes";

    public async findCommentVotes() : Promise<CommentVoteDB[]> {
        return [
            {
                user_id: "id-mock-normal",
                comment_id: "id-comment-1",
                vote: 1
            },
            {
                user_id: "id-mock-normal",
                comment_id: "id-comment-2",
                vote: 0
            }
        ]
    }

    public async findVoteByUserAndCommentId(user_id: string, comment_id: string) : Promise<CommentVoteDB | undefined> {
        if (user_id === "id-mock-normal"){
            if (comment_id === "id-comment-1"){
                return {
                    user_id: "id-mock-normal",
                    comment_id: "id-comment-1",
                    vote: 1
                }
            } else if (comment_id === "id-comment-2") {
                return {
                    user_id: "id-mock-normal",
                    comment_id: "id-comment-2",
                    vote: 0
                }
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public async createVote(newVoteDB : CommentVoteDB ) : Promise<void> {

    }

    public async updateVoteByUserAndCommentId(updatedVoteDB: CommentVoteDB, user_id: string, comment_id: string) : Promise<void> {

    }

    public async deleteVoteByUserAndCommentId(user_id: string, comment_id: string) : Promise<void> {

    }
}