const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(500).json({ message: "Please fill all field" });
      return;
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "email already registered!" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ email, name, password:hashedPassword });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    // send verification to the user
    sendVerificationToken(newUser.email, newUser.verificationToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });

  } catch (error) {
    console.log("error while registering " + error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// function to send verification email to the user
const sendVerificationToken = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jaihindkushwaha672001@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });
  // compose the email message

  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

//   send email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.log("Error sending verification email ", error);
    }
};


// endpoint to verify the email

router.get("/verify/:token",async(req,res)=>{
    try {
        const token=req.params.token;

        // find the use with given verification token verificationToken
        const user=await User.findOne({verificationToken:token});
        if(!user){
            console.log(user);
            return res.status(404).json({message:"Email verification failed !!"});
        }
        // Mark the user as verified
        user.verified=true;
        user.verificationToken=undefined;

        await user.save();

        res.status(200).json({message:"message verified successfully"})
    } catch (error) {
        res.status(500).json({message:"Email verification failed " })
    }
})

module.exports=router;