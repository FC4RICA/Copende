import { Schema, model } from "mongoose";
import { UserInterface, PlayInterface, PostInterface, RoleInterface } from "../interface/model";

const User = new Schema<UserInterface>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    create_at: {
        type: Date,
        required: true 
    },
});

export const UserModel = model<UserInterface>("User",User);

const Play = new Schema<PlayInterface>({
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    PostID: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    score: {
        type: Number,
        required: true
    },
    char_num: {
        type: Number,
        required: true
    },
    create_at: {
        type: Date,
        required: true 
    },
});

export const PlayModel = model<PlayInterface>("Play",Play)

const Post = new Schema<PostInterface>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    data: {
        type: Object,
    },
    UserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    create_at: {
        type: Date,
        required: true
    },
});

export const PostModel = model<PostInterface>("Post",Post)

const Role = new Schema<RoleInterface>({
    name: {
        type: String,
        required: true
    },
});

export const RoleModel = model<RoleInterface>("Role",Role)