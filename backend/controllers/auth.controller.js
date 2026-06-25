import User from '../models/user.model.js';
import jwt from 'jwtwebtoken';
import {generateAccessToken , generateRefreshToken , sendRefreshTokenCookie} from '../utils/auth.util.js'

export const register = async (req , res , next) => {
    try { 
        const {name , email , password, phone, role} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({success :false, message: "Email Already Registered"});
        }
        const user = await User.create({name , email , password , phone , role});
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        sendRefreshTokenCookie(res , refreshToken);

        res.status(201).json({
            success : true,
            message: "  User registered successfully!",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User Not Registered",
            error: err.message
        });
    }
};

export const login = async(req , res) => { 
    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Email and Password Required"});
        }
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:"User Does Not Exists"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Credentials"});
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        sendRefreshTokenCookie(res , refreshToken);

        res.status(201).json({
            success: true,
            message: "User Logged In Successfully",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email:user.email,
                role:user.role,
                avatar:user.avatar
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:"Error occured while logging in user",
            error: err.message});
    }
};


export const logout = async(req , res) => {
    try{
        res.cookie('refreshToken','none', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({ success: true, message: "User Logged Out Successfully"});
    }catch(err){
        return res.status(500).json({
            success : false,
            message: "Error occured while logging out",
            error: err.message
        });
    }
};