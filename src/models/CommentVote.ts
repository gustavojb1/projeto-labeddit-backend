export class CommentVote {
    constructor(
        private commentId: string,
        private userId: string,
        private vote = 0
    ){}

    public getUserId() : string {
        return this.userId;
    }

    public setUserId(value : string) : void {
        this.userId = value;
    }

    public getCommentId() : string {
        return this.commentId;
    }

    public setCommentId(value : string) : void {
        this.commentId = value;
    }

    public getVote() : number {
        return this.vote;
    }

    public setVote(value: number) : void {
        this.vote = value;
    }
}