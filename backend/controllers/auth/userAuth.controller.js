import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendVerificationEmail,sendWelcomeEmail, sendPasswordResetEmail ,passwordResetSuccessEmail } from '../../emailManagement/emails.js'
import { generateVerificationToken } from '../../../utils/generateVerificationToken.js'
import { generateTokenAndSetCookie } from '../../../utils/generateTokenAndSetCookie.js'
import { isValidEmail } from '../../../utils/isValidEmailFormat.js'
import { User } from '../../models/user.model.js'


export const register = async (req, res) => {

    const { email, name , password } = req.body
    try {
        if(!email || !name || !password){
            return res.status(400).json({message: 'Please enter all fields'})
        }
         if(isValidEmail(email) === false){
                    return res.status(400).json({ message: 'Invalid email format' });
        }
        const userAlreadyExists = await User.findOne({
            email               
        })
        if(userAlreadyExists){
            return res.status(400).json({success : false ,message: 'User already exists'})
        }
    } catch (error) {
        return res.status(500).json({success : false ,message: 'Internal server error'})
    }

    const hashedPassword = await bcrypt.hash(password, 10) //hashing the password
    const verificationToken = generateVerificationToken()  //for email verification

    const user = await User.create({
        email,
        name,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 1*60*60*1000  //verification token expires in 1 hour
    })

    generateTokenAndSetCookie(res, user._id)  //generateTokenAndSetCookie generates a token and sets it in a cookie....from generateTokenAndSetCookie.js in utils folder
    await sendVerificationEmail(user.email, verificationToken)  //sendVerificationEmail sends a verification email to the user....from emails.js in emailManagement folder 

    if(user){
        return res.status(201).json({
            success: true,
            message: 'User created successfully! Please verify your email to login',
            user:{
                ...user._doc,   //spreads the user object and sets the password to undefined
                password: undefined
            }
        })
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.body

    try {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
    
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid or expired token'})
        }
    
        user.isverified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        sendWelcomeEmail(user.email , user.name)
        res.status(200).json({
            success: true, 
            message: 'Email verified successfully',
            user:{
                ...user._doc,
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
    const user = await User.findOne({ email })
    if(!user){
        return res.status(400).json({success: false, message: 'Invalid credentials'})
    }
    if(!user.isverified){
        return res.status(400).json({success: false, message: 'Please verify your email to login'})
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    
    if(!isPasswordCorrect){
        return res.status(400).json({success: false, message: 'Incorrect password'})
    }

    generateTokenAndSetCookie(res, user._id)
    user.lastLogin = Date.now()
    await user.save()
    res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        user:{
            ...user._doc,
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
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({success: false, message: 'User not found'})
        }
        const resetPasswordToken = crypto.randomBytes(20).toString('hex');
        const resetPasswordTokenExpiresAt = Date.now() + 1 * 24 * 60 * 60 * 1000
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;
        
        await user.save();
        
        await sendPasswordResetEmail(email, resetPasswordToken)

        return res.status(200).json({success: true, message: 'Reset password link sent to your email'})

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}

export const resetPassword = async (req, res) => {
    
    try {
        const password = req.body.password
        const resetPasswordToken = req.params.token
        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })
        console.log('Request Token:', resetPasswordToken);
        

        if(!user){
            return res.status(400).json({success: false, message: 'Invalid or expired token'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined
        await user.save()
        await passwordResetSuccessEmail(user.email)
        res.status(200).json({success: true, message: 'Password reset successfully'})

    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}