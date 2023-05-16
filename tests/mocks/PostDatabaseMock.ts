import { BaseDatabase } from "../../src/database/BaseDatabase";
import { PostDB } from "../../src/types";

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts";

    public async findPosts() : Promise<PostDB[]>{
        return [
            {
                id: "id-post-1",
                creator_id: "id-mock-normal",
                content: "Hello world!",
                upvotes: 1,
                downvotes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: "id-post-2",
                creator_id: "id-mock-normal",
                content: "Hello world!",
                upvotes: 0,
                downvotes: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    }

    public async findPostById(id: string) : Promise<PostDB | undefined>{
        switch (id){
            case "id-post-1":
                return {
                    id: "id-post-1",
                    creator_id: "id-mock-normal",
                    content: "Hello world!",
                    upvotes: 1,
                    downvotes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            case "id-post-2":
                return {
                    id: "id-post-2",
                    creator_id: "id-mock-normal",
                    content: "Hello world!",
                    upvotes: 0,
                    downvotes: 1,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            default:
                return undefined;
        }
    }

    public async createPost(newPostDB : PostDB) : Promise<void>{

    }

    public async updatePostById(updatedPostDB : PostDB, id : string) : Promise<void>{

    }

    public async deletePostById(id: string) : Promise<void>{

    }
}