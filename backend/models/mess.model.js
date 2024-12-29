import mongoose from "mongoose";

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
    },
    amount:{
        type: Number,
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
    },


},{timestamps: true});    

MessSchema.index({ verificationTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });
export const Mess = mongoose.model('Mess', MessSchema);