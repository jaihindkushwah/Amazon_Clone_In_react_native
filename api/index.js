const express=require('express');
require('dotenv').config();
const bodyParser=require('body-parser');
// const mongoose=require('mongoose');
const cors=require('cors');
const register=require('./router/register');
const login=require('./router/login');
const order=require("./router/orders");
const profile=require("./router/profile");
const address=require("./router/address");

// db configuration
require('./config/dbconfig');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to express"})
})

app.use(register);
app.use(login);
app.use(address);
app.use(order);
app.use(profile)



app.listen(8000,()=>{
    console.log("app is running on port 8000");
})