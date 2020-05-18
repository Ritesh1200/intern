const express =require("express")  //used for use express framework
const bodyParser=require("body-parser")  //for handling user data whicj they filled my form
var mongoose =require("mongoose");  //for connecting to mongoDB

const db=require("./connectivity.js") // hide it for security purpose


const user=require("./models/user.js") //importing models


const app=express()
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set('view engine','ejs')

var mongoose =require("mongoose");

var mongoose =require("mongoose");


////Routes for register page
app.get('/',(req,res)=>{
   res.render('NewUser.ejs',{msg:""});
})


//for handling new user registration
app.post('/register',(req,res)=>{
      var users=new user(); //making object of user model
      users.name=req.body.name;  //taking data from form and store in object of user with the help of body-parser
      users.username=req.body.username;
      users.save((err)=>{
         if(err){
            console.log("some error in data saving");
            res.render("NewUser.ejs",{msg:"error in saving user data please try again"})
         }else{
            console.log("data saved")
            res.redirect('/all/data');
         }
      })
})

// this route is used for show all data
app.get('/all/data',(req,res)=>{
   console.log("your all data");
   user.find({},(err,data)=>{
      if(err){ //this error occur when to take data from dataBase
         console.log("some error on taking data from dataaBase")
         res.render("NewUser.ejs",{msg:"Some error in rendering all user data,please try again later"})
      }else{
         res.render("data.ejs",{msg:data});
      }
   })
})

// this route for delete the user
app.get("/delete/:id",(req,res)=>{
      user.deleteOne({_id:req.params.id},(err)=>{
         if(err){
               console.log("erors")
               res.render("NewUser.ejs",{msg:"Some error on deleting user data,please try again later"})
         }else{
               
              res.redirect('/all/data');
         }
      })
})


//this route for update the user
app.get("/update/:id",(req,res)=>{
   user.find({_id:req.params.id},(err,data)=>{
      if(err){
         res.render("NewUser.ejs",{msg:"Some error in updating user data,please try again later"})
      }else{
         console.log(data)
         res.render('update.ejs',{msg:data,id:req.params.id})
      }  
   })
})


//for handling updates
app.post('/update',(req,res)=>{
   user.findByIdAndUpdate(req.body.id,{$set:{name:req.body.name,username:req.body.username}},{multi:true})
   .then((docs)=>{
      
      res.redirect('/all/data');
   })
   .catch((err)=>{
      console.log("error",err)
      res.render("NewUser.ejs",{msg:"Some error in updating user data,please try again later"})
     
   })
})




 app.listen(process.env.PORT||3000,()=>{
   console.log("listening port 3000")
})