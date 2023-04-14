export interface UserDB {
  id: string
  username: string
  email: string
  password: string
  receive_emails: number
  role: USER_ROLES
  created_at: string
}

export interface PostDB {
  id: string
  creator_id: string
  content: string
  upvotes: number
  downvotes: number
  created_at: string
  updated_at: string
}

export interface PostVoteDB {
  user_id: string
  post_id: string
  vote: number
}

export interface CommentVoteDB {
  user_id: string
  comment_id: string
  vote: number
}

export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
}

export interface TokenPayload {
  id: string,
  username: string,
  role: USER_ROLES
}

export interface CommentDB {
  id: string
  post_id: string
  creator_id: string
  content: string
  upvotes: number
  downvotes: number
  created_at: string
  updated_at: string
}