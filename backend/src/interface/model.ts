import { ObjectId } from "mongoose";

export interface UserInterface {
    username : string;
    password : string;
    email : string;
    create_at : Date;
}

export interface PlayInterface {
    userId : ObjectId
    postId : ObjectId
    score : number;
    char_num :  number;
    create_at : Date;
}

export interface PostInterface {
    name : string;
    postImage : ObjectId;
    data : string[];
    create_at : Date;
    userId : ObjectId
}

export interface RoleInterface {
    name : string;
}

export interface PayloadUser {
    userId : string;
}

export interface UserRoleInterface{
    userId : ObjectId
    roleId : ObjectId
}

export interface ImageInterface {
    name : string;
}