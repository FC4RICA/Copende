"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.PostModel = exports.PlayModel = exports.UserModel = void 0;
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
    UserID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    PostID: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.PlayModel = (0, mongoose_1.model)("Play", Play);
const Post = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
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
        required: true
    },
});
exports.RoleModel = (0, mongoose_1.model)("Role", Role);
