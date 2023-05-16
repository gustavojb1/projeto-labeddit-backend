import { BaseDatabase } from "../../src/database/BaseDatabase";
import { CommentDB } from "../../src/types";

export class CommentDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments";

    public async findComments() : Promise<CommentDB[]>{
        return [
            {
                id: "id-comment-1",
                post_id: "id-post-1",
                creator_id: "id-mock-admin",
                content: "Hello World!",
                upvotes: 1,
                downvotes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: "id-comment-2",
                post_id: "id-post-2",
                creator_id: "id-mock-admin",
                content: "Hello World!",
                upvotes: 0,
                downvotes: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    }

    public async findCommentById(id: string) : Promise<CommentDB | undefined> {
        switch (id){
            case "id-comment-1":
                return {
                    id: "id-comment-1",
                    post_id: "id-post-1",
                    creator_id: "id-mock-admin",
                    content: "Hello World!",
                    upvotes: 1,
                    downvotes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            case "id-comment-2":
                return {
                    id: "id-comment-2",
                    post_id: "id-post-2",
                    creator_id: "id-mock-admin",
                    content: "Hello World!",
                    upvotes: 0,
                    downvotes: 1,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            default:
                return undefined;
        }
    }

    public async createComment(newCommentDB : CommentDB) : Promise<void> {

    }

    public async updateCommentById(updatedCommentDB : CommentDB, id: string) : Promise<void>{

    }

    public async deleteCommentById(id: string) : Promise<void> {
        
    }
}