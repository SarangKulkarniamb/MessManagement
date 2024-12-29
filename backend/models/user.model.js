import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
        balance: {
            type: Number,
            default: 0,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
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
        qrCode: {
            type: String,
            default: "", 
        },
    },
    { timestamps: true } 
);


userSchema.index({ verificationTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);
