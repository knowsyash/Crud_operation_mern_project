const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(express.json());
const cors = require('cors');
app.use(cors());
const User = require('./models/userDataModel');
mongoose.connect(process.env.URI||8000).then(()=>{
    console.log("connected suceesfully");
    app.listen(process.env.PORT);

})
.catch((error)=>{
    console.log("error",error);
})
app.use((req, res, next) => {
    if (req.path === "/favicon.ico") {
        return res.status(204).end(); // Ignore favicon requests
    }
    next();
});

app.post("/",async(req,res)=>{
    const {name,age,email}=req.body; //name = req.body.name
    
    try{
    const Useradd = await User.create({
        name:name,
        email:email,
        age:age,
    })
    res.status(201).json(Useradd)   
}catch(error){
  res.status(400).json({error:error.message})
}
});

app.get("/",async(req,res)=>{
    try{
    const showAll = await User.find(); 
    res.status(200).json(showAll);
} catch(error){
    console.log(error)
    res.sendStatus(500).json({error:error.message});
}
    // res.send("api running");
})
//single user
app.get("/:id",async(req,res)=>{
    const {id} = req.params; //from url
    try{
    const singleUser = await User.findById({_id:id}); 
    res.status(200).json(singleUser);
} catch(error){
    console.log(error)
    res.Status(500).json({error:error.message});
}
    
})
//delete
app.delete("/:id",async(req,res)=>{
    const {id} = req.params; //from url
    try{
    const singleUser = await User.findByIdAndDelete({_id:id}); 
    res.status(200).json(singleUser);
} catch(error){
    console.log(error)
    res.sendStatus(500).json({error:error.message});
}
    
})
app.patch("/:id",async(req,res)=>{
    const {id} = req.params; //from url
    const {name,email,age} = req.body;
    try{
    const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true}); 
    res.status(200).json(updateUser);
} catch(error){
    console.log(error)
    res.sendStatus(500).json({error:error.message});
}  
})


