import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance:{
        type: Number,
        default : 0,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isverified : {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiresAt: { 
        type: Date,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiresAt: {
        type: Date,
    },
    qrCode: { type: String, defualt: "" }, 
},{timestamps: true});


const MessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    isverified : {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiresAt: { 
        type: Date,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiresAt: {
        type: Date,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    timings: {
        breakfast: { start: String, end: String },
        lunch: { start: String, end: String },
        dinner: { start: String, end: String },
        required: true,
    },


},{timestamps: true});    


export const User = mongoose.model('User', userSchema);

