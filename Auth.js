const{Schema,model}=require("mongoose")
const { isEmail } = require("validator")
const bcrypt=require("bcrypt")

const userSchema=new Schema({
    email:{
type:String,
unique:true,
lowercase:true,
required:[true,"this field is required"],
validate:[isEmail,"Enter valid email"]
    },
    password:{
        type:String,
        minlength:[4,"minimum length is 4"],
        required:[true,"password is required"]  
    }
},{timestamps:true})
//mongoose hook
userSchema.pre("save",async function(next){
    let salt=await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,
        salt)
    next()
})
module.exports=model("user",userSchema)