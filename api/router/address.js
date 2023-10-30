const User = require("../models/user");
const router = require("express").Router();

router.post("/addresses", async (req, res) => {
  try {
    const { userId,address } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found! " });
    }
    console.log(address);
    user.address.push(address);
    
    // save the updated user in backend;
    await user.save();

    res.status(200).json({message:"Address created successfully"});

  } catch (error) {
    res.status(500).json({message:"Error adding address"})
  }
});
router.get("/addresses/:userId",async(req,res)=>{
    try {
        const userId=req.params.userId;
        const user=await User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({address:user.address});
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving the user address" });
    }
})

module.exports=router;
