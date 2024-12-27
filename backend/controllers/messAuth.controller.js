import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { generateVerificationToken } from '../../utils/generateVerificationToken.js'
import { generateTokenAndSetCookie } from '../../utils/generateTokenAndSetCookie.js'
import { isValidEmail } from '../../utils/isValidEmailFormat.js';
import { sendVerificationEmail,sendWelcomeEmail, sendPasswordResetEmail ,passwordResetSuccessEmail } from '../emailManagement/emails.js';
import { Mess } from '../models/mess.model.js'; 


export const register = async (req, res) => {
    const { name, email, password, location, amount, timings } = req.body;

    try {

        if (!name || !email || !password ) {
            return res.status(400).json({ message: 'Please enter all required fields' });
        }
        if(isValidEmail(email) === false){
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const messAlreadyExists = await Mess.findOne({ email });
        if (messAlreadyExists) {
            return res.status(400).json({ success: false, message: 'Mess already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = generateVerificationToken();

        const mess = await Mess.create({
            name,
            email,
            password: hashedPassword,
            location,
            amount,
            timings,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token valid for 24 hours
        });

        generateTokenAndSetCookie(res, mess._id);

        await sendVerificationEmail(mess.email, verificationToken);

        return res.status(201).json({
            success: true,
            message: 'Mess created successfully! Please verify your email to activate your account.',
            mess: {
                ...mess._doc, 
                password: undefined,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



export const verifyEmail = async (req, res) => {
    const { token } = req.body

    try {
        const mess = await Mess.findOne({
            verificationToken: token,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
    
        if(!mess){
            return res.status(400).json({success: false, message: 'Invalid or expired token'})
        }
    
        mess.isverified = true
        mess.verificationToken = undefined
        mess.verificationTokenExpiresAt = undefined
        await mess.save()

        sendWelcomeEmail(mess.email , mess.name)
        res.status(200).json({
            success: true, 
            message: 'Email verified successfully',
            mess:{
                ...mess._doc,
                password: undefined
            }
        })

    } catch (error) {

        return res.status(500).json({success: false, message: 'Internal server error'})
    
    }
}

export const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const mess = await Mess.findOne({ email })
    if(!mess){
        return res.status(400).json({success: false, message: 'Invalid credentials'})
    }
    if(!mess.isverified){
        return res.status(400).json({success: false, message: 'Please verify your email to login'})
    }
    const isPasswordCorrect = await bcrypt.compare(password, mess.password)
    
    if(!isPasswordCorrect){
        return res.status(400).json({success: false, message: 'Incorrect password'})
    }

    generateTokenAndSetCookie(res, mess._id)
    mess.lastLogin = Date.now()
    await mess.save()
    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        mess:{
            ...mess._doc,
            password: undefined
        }
    })
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({success: true, message: 'Logged out successfully'})
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const mess = await Mess.findOne({ email });
        if(!mess){
            return res.status(400).json({success: false, message: 'mess not found'})
        }
        const resetPasswordToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 24 * 60 * 60 * 1000
        mess.resetPasswordToken = resetPasswordToken;
        mess.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
        await mess.save();

        await sendPasswordResetEmail(email, resetPasswordToken)

        return res.status(200).json({success: true, message: 'Reset password link sent to your email'})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const resetPassword = async (req, res) => {
    
    try {
        const password = req.body.password
        const resetPasswordToken = req.params.token
        const mess = await Mess.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })
        console.log('Request Token:', resetPasswordToken);
        

        if(!mess){
            return res.status(400).json({success: false, message: 'Invalid or expired token'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        mess.password = hashedPassword
        mess.resetPasswordToken = undefined
        mess.resetPasswordTokenExpiresAt = undefined
        await mess.save()
        await passwordResetSuccessEmail(mess.email)
        res.status(200).json({success: true, message: 'Password reset successfully'})

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}