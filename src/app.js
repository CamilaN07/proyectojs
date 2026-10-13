const express = require('express');
const router = require('./routes');

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Los middleware propios
app.get("/",(req,res)=>{
    res.send("API Rest 3407180")
})