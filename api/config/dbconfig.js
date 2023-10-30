const mongoose=require('mongoose');

const dbUrl=process.env.DB_URL;
mongoose.connect(dbUrl)
.then(()=>{console.log("DB connected successfully")})
.catch(()=>{console.log("DB could not connect")})

module.exports=mongoose;