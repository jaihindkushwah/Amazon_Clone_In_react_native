const User = require("../models/user");
const router=require("express").Router();


router.get("/profile/:userId",async(req,res)=>{
    try {
        const userId=req.params.userId;
        const user=await User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving the user profile" });
    }
})



module.exports=router;