const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userInfo = require('./mongooseSchema');
const cards = require("./createSchema");
const deletedPackageHistory = require('./HistorySchema');
const server = express();
const mongoose = require('mongoose');
const port = process.env.port || 1100;

const corsOptions = {
    origin: "*"
}
server.use(cors(corsOptions))
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

// mongoose.connect('mongodb://localhost:27017/signupUser',{
//     family: 4
// })
mongoose.connect('mongodb+srv://priyakumawat9868:mernproject9868@cluster0.wal6pbl.mongodb.net/mernstack?retryWrites=true&w=majority');

//  for save Signup user data in database.... =======================================

server.post("/signup",async(req,res)=>{
  const signupUser = new userInfo();
   signupUser.email = req.body.email;
   signupUser.password = req.body.password;
  const user = await signupUser.save();
  console.log(user);
  console.log(req.body);
  res.json(req.body)
});

// for find Data in Database ==============================

server.post("/login",async(req,res)=>{
  try{
    const signupUser = await userInfo.findOne(req.body)
    console.log("signupUser",signupUser)
    if(signupUser){
      res.status(200).json({
        signupUser: signupUser,
        status: true,
        toastmessage: "You have LogIn successfully...."
      })
    }else{
      res.status(200).json({
        status: false,
        toastmessage: "User not find Sign-up first...."
      })
    }
  }catch(e){
    console.log(e)
       res.status(404).json({
       toastmessage: "Something Went Wrong...."
       })
  }
})

server.get("/userLogin",async(req,res)=>{
  const userLogin = await userInfo.find(req.body);
  res.send(userLogin)
})
// for card creation ======================================================
server.post("/create",async(req,res)=>{
    const cardData = new cards();
    cardData.image = req.body.image
    cardData.title = req.body.title;
    cardData.subtitle = req.body.subtitle;
    cardData.days = req.body.days;
    cardData.price = req.body.price;
    cardData.destination = req.body.destination;
    cardData.button = req.body.button;
    console.log(req.body);
    res.json(req.body)
    const travelCard = await cardData.save();
    console.log(travelCard, 'trevelcard');

})

// for get data ============================
server.get("/travelCards",async(req,res)=>{
  const travelcards = await cards.find();
  res.send(travelcards)
})

// ================================= CRUD OPERATION ===================================//

// 1. For Delete Data in Database ===================================

server.delete("/delete/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const deleteTravelInfo = await cards.findByIdAndDelete(id)
    console.log(deleteTravelInfo,"deleteTravelInfo")
    if(deleteTravelInfo){
      res.status(200).json({
        deleteTravelInfo: deleteTravelInfo,
        status: true,
        message: "Travel Package is deleted...."
      })
    }
  }
  catch(e){
   console.log(e)
   res.status(404).json({
    error: e,
    message: "Something went wrong...."
   })
  }
})

// 2. For Update Travellers Package Info ==============================================

server.patch("/update/:id",async(req,res)=>{
try{
  const id  = req.params.id;
  const updatePackage = await cards.findByIdAndUpdate(id, req.body)
  console.log("updatePackage",updatePackage);
  res.json(req.body)
}
catch(e){
   res.status(404).json(e)
}
})

// Firstly Create a new schema file for Deleted History ===============================

server.post("/history/:id",async(req,res)=>{
 const deletedPackage = new deletedPackageHistory();
//  deletedPackage.image = req.body.image
//   deletedPackage.title = req.body.title;
//   deletedPackage.subtitle = req.body.subtitle;
//   deletedPackage.days = req.body.days;
//   deletedPackage.price = req.body.price;
//   deletedPackage.destination = req.body.destination;
//   deletedPackage.button = req.body.button;
 const deletedCard = await deletedPackage.save()
 console.log(deletedCard);
 res.json(req.body)
})

// for get data in react through map by particular id Data ==============================

server.get("/package/:id",async(req,res)=>{
   const id = req.params.id
   const packageInfo = await cards.findOne({_id: id});
   res.json({"packageInfo": packageInfo})
   console.log(packageInfo)
})

server.get("/read/:id",async(req,res)=>{
   const id = req.params.id;
   const readInfo = await cards.findOne({_id: id});
   res.json({"Info": readInfo});
   console.log(readInfo)
})






server.listen(port,()=>{
  try{
    console.log("Connected to server")
  }
  catch{
    console.log("Can't Connected to Server")
  }
})


