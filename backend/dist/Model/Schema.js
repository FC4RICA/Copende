"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleModel = exports.RoleModel = exports.PostModel = exports.PlayModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const User = new mongoose_1.Schema({
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
exports.UserModel = (0, mongoose_1.model)("User", User);
const Play = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.PlayModel = (0, mongoose_1.model)("Play", Play);
const Post = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    imageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Image",
        required: true
    },
    data: {
        type: Object,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    create_at: {
        type: Date,
        required: true
    },
});
exports.PostModel = (0, mongoose_1.model)("Post", Post);
const Role = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});
exports.RoleModel = (0, mongoose_1.model)("Role", Role);
const UserRole = new mongoose_1.Schema({
    userId: mongoose_1.Schema.Types.ObjectId,
    roleId: mongoose_1.Schema.Types.ObjectId
});
exports.UserRoleModel = (0, mongoose_1.model)("UserRole", UserRole);
