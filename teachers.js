import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
mongoose.set("strictQuery", false);
// connectDB();
const router=express.Router();
const teachersSchema=mongoose.Schema({
    teachers:[{
     name:{
        type:String,
        required:true
       },
   subject:{
        type:String,
        required:true
       }
}]})
const Teachers = mongoose.model('Teachers',teachersSchema);
teachersSchema.plugin(Teachers);
const teachers={
    teachers:[{
    name:"Harish",
    subject:"English"
},
{
    name:"Damodaran",
    subject:"Maths"
},
{
    name:"Shalini",
    subject:"Science"
},
{
    name:"Prasath",
    subject:"Social"
},
{
    name:"Joys",
    subject:"Tamil"
}]}
//get
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(teachers);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Teachers.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          Teachers:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
)
});
//post
router.post("/",async(req,res)=>{
    try{
      const teachers={
        teachers:req.body.teachers
      };
      console.log(teachers);
      const menu=new Teachers(teachers);
      const teachersCreated=await menu.save();
      if(teachersCreated){
        console.log("Created");
        res.status(201).json({message:"Profile available"});
    }else
    {
        res.status(401);
        throw new Error("not available");
    }
  } catch (err){
          return res.status(500).json({message: err.message});
        }});
//update
router.put('/:id',(req,res)=>{
  console.log(req.params.id);
  Teachers.findOneAndUpdate({_id:req.params.id},{
      $set:{
        teachers:req.body.teachers
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_teachersDetails:result       
       })
  })
  .catch(err=>{
      console.log(err)
      res.status(500).json({
          error:err
      })
  })
  })      
       
  //delete
  router.delete('/:id',(req,res)=>{
    console.log(req.params.id);
    Teachers.deleteOne({_id:req.params.id},{
        $set:{
            teachers:req.body.teachers
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_teachersDetails:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete("/",(req,res)=>{
    
        Teachers.deleteMany({}).then((result) => {
            res.send(result);
        })
    });

export default router;