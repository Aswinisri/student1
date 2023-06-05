import express from "express";
import mongoose from "mongoose";
const router=express.Router();


const workSchema=mongoose.Schema({
  work:[
    {
       subject:{
        type:String,
        required:true
       },
       lesson:{
        type:String,
        required:true
       },
       homework:{
        type:String,
        required:true
       }
}]
})

var Work=mongoose.model("Work",workSchema);
workSchema.plugin(Work);

const work={
    work:[
    {
        subject:"Tamil",
        lesson:"unit-3",
        homework:"Ex:12"
      },
      {
          subject:"English",
          lesson:"unit-3",
          homework:"Ex:12"
        },
        {
          subject:"Maths",
          lesson:"unit-3",
          homework:"Ex:12"
        },
        {
          subject:"Science",
          lesson:"unit-3",
          homework:"Ex:12"
        },
        {
          subject:"History",
          lesson:"unit-3",
          homework:"Ex:12"
        },
]}




//homeworkroutes-------------------->
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(work);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Work.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          work:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
)
}
)
//post
router.post("/",async(req,res)=>{
  try{
   const workdetails={
            work:req.body.work
          
      };
      console.log(workdetails);
      const work=new Work(workdetails);
const workCreated=await work.save();
if(workCreated){
  console.log("created");
res.status(201).json({message:"successfully created"});
}
else{
  res.status(401);
  throw new error("not found ");
}
}catch(err){
  return res.status(500).json({message:err.message});
}}
);
//update
router.put('/:id',(req,res)=>{
  console.log(req.params.id);
  Work.findOneAndUpdate({_id:req.params.id},{
      $set:{
         
        work:req.body.work
          
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_workDetails:result       
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
      Work.deleteOne({_id:req.params.id},{
          $set:{
             
            work:req.body.work
              
          }
      })
      .then(result=>{
          res.status(200).json({
              Deleted_workDetails:result       
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
    
        Work.deleteMany({}).then((result) => {
            res.send(result);
        })
    });  

   

    export default router;
   //export default{todayclass,homework,assignment,tomorrowSchedule};
