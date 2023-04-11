import { PostDB } from "../types";

export class Post {
    constructor(
        private id : string,
        private content : string,
        private upvotes: number,
        private downvotes: number,
        private createdAt : string,
        private updatedAt : string,
        private creator: {
            id: string,
            username: string
        },
        private comments: {
            id: string,
            content: string,
            upvotes: number,
            downvotes: number,
            creator: {
                id: string,
                username: string
            }
        }[]
    ){}

    public toDBModel() : PostDB {
        return {
            id: this.id,
            content: this.content,
            upvotes: this.upvotes,
            downvotes: this.downvotes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            creator_id: this.creator.id
        }
    }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getUpvotes(): number {
        return this.upvotes
    }

    public setUpvotes(value: number): void {
        this.upvotes= value
    }

    public getDownvotes(): number {
        return this.downvotes
    }

    public setDownvotes(value: number): void {
        this.downvotes = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }
    
    public getCreator() : {
        id : string
        username : string
    } {
        return this.creator
    }

    public setCreator(value: {
        id : string,
        username: string
    }){
        this.creator = value;
    }

    public getComments() : {
        id: string
        content: string
        upvotes: number
        downvotes: number
        creator: {
            id: string
            username: string
        }
    }[] {
        return this.comments
    }

    public setComments(value: {
        id: string
        content: string
        upvotes: number
        downvotes: number
        creator: {
            id: string
            username: string
        }
    }[]) : void {
        this.comments = value;
    }
}