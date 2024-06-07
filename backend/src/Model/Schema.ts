import { Schema, model } from "mongoose";
import { UserInterface, PlayInterface, PostInterface, RoleInterface, UserRoleInterface} from "../interface/model";

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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
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

export const PlayModel = model<PlayInterface>("Play",Play);

const Post = new Schema<PostInterface>({
    name: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    data: [String],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    create_at: {
        type: Date,
        required: true
    },
});

export const PostModel = model<PostInterface>("Post",Post);

const Role = new Schema<RoleInterface>({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

export const RoleModel = model<RoleInterface>("Role",Role);

const UserRole = new Schema<UserRoleInterface>({
    userId : Schema.Types.ObjectId,
    roleId : Schema.Types.ObjectId
});

export const UserRoleModel = model<UserRoleInterface>("UserRole",UserRole);