require("dotenv").config();
require('./config/db').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const app = express();
app.use(express.json());

const User = require('./model/user');

app.get('/', (req, res) => {

    res.status(200).send("<h1>Hello from AuthSysetm<h1/>");

})

    app.post('/register', async (req, res) => {

    try {
        const { firstname, lastname, email, password}=req.body;
        if (!( email && password && firstname && lastname )) {
            res.status(400).send('All field are required');
        }
      const sameUser= await User.findOne({ email }); //promise
    
      
        // console.log("coment1");
        if (sameUser) {
            //console.log("coment2");
            return res.status(401).send('user already exists');
        }
        //console.log("coment23");
        const myEncPassword = await bcrypt.hash(password,10);
        //const myEncPassword = await bcrypt.hashSync(password, 10);
       const user=User.create({
            firstname,
            lastname,
            email:email.toLowerCase(),
            password:myEncPassword
        });
        const token =jwt.sign(
            {user_id: user._id,email},
            process.env.SECRTET_KEY,
            {
                expiresIn:"2h"
            }

        );
        user.token =token;
        //update or not in DB
        
        //TODO:handle password situation
         user.password = undefined;
         return res.status(201).json(user);
    
    } catch (error) {
        console.log(error);
    }



   
});

app.post("/login",async (req,res)=>{

    try {
        const{email,password}=req.body;

        if(!(email && password)){
            return res.status(404).send('pls signup');
        }
         const user= await User.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))){
            const token =jwt.sign(
                {user_id: user._id,email},
                process.env.SECRTET_KEY,
                {
                    expiresIn:"2h"
                }
    
            );
            user.token =token;
             //update or not in DB
        
        //TODO:handle password situation
         user.password = undefined;
         return res.status(201).json(user);
        }
        return res.status(401).send("email or password is incorrect");
    } catch (error) {
        console.log(error);
    }

  })

module.exports = app;
