import { ObjectId } from "mongoose";

export interface UserInterface {
    username : string;
    password : string;
    email : string;
    create_at : Date;
}

export interface PlayInterface {
    UserID : ObjectId
    PostID : ObjectId
    score : number;
    char_num :  number;
    create_at : Date;
}

export interface PostInterface {
    name : string;
    image : string;
    data : object;
    create_at : Date;
    UserID : ObjectId
}

export interface RoleInterface {
    name : string;
}

export interface PayloadUser {
    UserID : string;
}
