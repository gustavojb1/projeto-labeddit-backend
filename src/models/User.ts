import { UserDB, USER_ROLES } from "../types";

export class User {
    constructor(
        private id : string,
        private username : string,
        private email : string,
        private password : string,
        private receiveEmails: number,
        private role : USER_ROLES,
        private createdAt : string
    ){}

    public toDBModel() : UserDB {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            receive_emails: this.receiveEmails,
            role: this.role,
            created_at: this.createdAt
        }
    }

    public getId() : string {
        return this.id;
    }

    public setId(value : string) : void {
        this.id = value;
    }

    public getUsername() : string {
        return this.username;
    }

    public setUsername(value : string) : void {
        this.username = value;
    }

    public getEmail() : string {
        return this.email;
    }

    public setEmail(value : string) : void {
        this.email = value;
    }

    public getPassword() : string {
        return this.password;
    }

    public setPassword(value : string) : void {
        this.password = value;
    }

    public getReceiveEmails() : number {
        return this.receiveEmails;
    }

    public setReceiveEmails(value: number) : void {
        this.receiveEmails = value;
    }

    public getRole() : USER_ROLES {
        return this.role;
    }

    public setRole(value : USER_ROLES) : void {
        this.role = value;
    }

    public getCreatedAt() : string {
        return this.createdAt;
    }

    public setCreatedAt(value : string) : void {
        this.createdAt = value;
    }
}