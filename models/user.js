var mongoose =require("mongoose");

var userSchema = mongoose.Schema({
   username:{
      type:String,
      unique:true,
      required:true
   },
   name: {
      type:String,
      unique:false,
      required:true
   }
hero
   
})
module.exports= mongoose.model("user",userSchema)