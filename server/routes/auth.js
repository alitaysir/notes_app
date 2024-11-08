import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const router=express.Router()

router.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const user= await User.findOne({email})
        if(user){
            return res.status(401).json({success:false,
                message:"User already exists"
            })
        }

        const hashpassword=await bcrypt.hash(password,10)

        const newuser= new User({name,email,password:hashpassword})

        await newuser.save();

        return res.status(200).json({success:true, message:"User created successfully"})
    
    } catch (error) {
        return res.status(500).json({success:false,
            message:"Error creating user"
        })

    }
})

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await User.findOne({email})
        if(!user){
            return res.status(401).json({success:false,
                message:"User doesn't exist"
            })
        }

        const checkpassword= await bcrypt.compare(password,user.password)
        if(!checkpassword){
            return res.status(401).json({success:false,
                message:"Invalid password"
            })
        }

        const token=jwt.sign({id:user._id},"secretkeyforlogin@123",{expiresIn:"15h"})

        return res.status(200).json({success:true, token, user:{name:user.name} , message:"User Logged In"})
    
    } catch (error) {
        return res.status(500).json({success:false,
            message:"Error in Login"
        })

    }
})



export default router