const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt=require("jsonwebtoken");

const match= (password,hashedPassword)=>{
        return bcrypt.compareSync(password,hashedPassword);
}

router.post("/login",async(req,res)=>{

    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(500).json({"message":"Please fill all the field"});
        }

        const user= await User.findOne({email:email});
        if(!user){
            return res.status(401).json({"message":"Invalid email or password"});
        }
        if(!match(password,user.password)){
            return res.status(401).json({"message":"Password not matched ! "}); 
        }

        const token=jwt.sign({userId:user._id},generateSecretKey());
        
        res.status(200).json({message:"login successfully",token:token})

    } catch (error) {
        res.status(500).json({"message":"Login failed !"})
    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

module.exports=router;