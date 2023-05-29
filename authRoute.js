const express=require("express")
let authRouter=express.Router()
let User=require("../models/Auth")

function handleError(err){
    console.log(err.message,err.code)
    let errors={email:"", password:""}

if(err.code===11000){
    errors["email"]="user already exists";
    return errors;
}
if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
        errors[properties.path]=properties.message
    })
}   
return errors; 
}



authRouter.get("/home",(req,res)=>{
    res.render("home")
})

authRouter.get("/",(req,res)=>{
    res.render("home")
})

authRouter.get("/login",(req,res)=>{
    res.render("login")
})

authRouter.get("/signup",(req,res)=>{
    res.render("signup")
})
 authRouter.post("/signup",async(req,res)=>{
     let {email,password}=req.body
     try{
         let user=await User.create({email,password})
        res.status(201).json(user)
    }catch(err) {
        let errors=handleError(err)
        res.status(400).json((errors))
            //  console.log(error)
            //  res.send("user not found")
        }
    })
authRouter.get("/secret",(req,res)=>{
    res.render("secret")
})

module.exports=authRouter