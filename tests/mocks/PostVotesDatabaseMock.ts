import { BaseDatabase } from "../../src/database/BaseDatabase";
import { PostVoteDB } from "../../src/types";

export class PostVotesDatabaseMock extends BaseDatabase {
    public static TABLE_POST_VOTES = "post_votes";

    public async findPostVotes() : Promise<PostVoteDB[]> {
        return [{
            user_id: "id-mock-admin",
            post_id: "id-post-1",
            vote: 1
        },
        {
            user_id: "id-mock-admin",
            post_id: "id-post-2",
            vote: 0
        }   
        ]
    }

    public async findVoteByUserAndPostId(user_id: string, post_id: string) : Promise<PostVoteDB | undefined>{
        if (user_id === "id-mock-admin"){
            if (post_id === "id-post-1"){
                return {
                    user_id: "id-mock-admin",
                    post_id: "id-post-1",
                    vote: 1
                }
            } else if (post_id === "id-post-2"){
                return {
                    user_id: "id-mock-admin",
                    post_id: "id-post-2",
                    vote: 0
                }
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public async createVote(newVoteDB : PostVoteDB) : Promise<void>{

    }

    public async updateVoteByUserAndPostId(updatedVoteDB: PostVoteDB, user_id: string, post_id: string) : Promise<void> {

    }

    public async deleteVoteByUserAndPostId(user_id: string, post_id: string) : Promise<void> {

    }
}