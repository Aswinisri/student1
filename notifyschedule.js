import express from "express";
import mongoose from "mongoose";
const router=express.Router();

const scheduleSchema=mongoose.Schema({
    schedule:[{
       date:{
          type:String,
          required:true
       },
       session:{
          type:String,
          required:true
       },
       lesson:{
          type:String,
          required:true
       },
       unit:{
          type:String,
          required:true
       },
}]
})

var Schedule=mongoose.model("Schedule",scheduleSchema);
scheduleSchema.plugin(Schedule);

const tomorrowSchedule={
schedule:[
  {
  date:"10-06-2022",
  session:"09:30-10:15",
  lesson:"History",
  unit:"unit-1"
 },
 {
  date:"10-06-2022",
  session:"09:30-10:15",
  lesson:"Science",
  unit:"unit-1"
 },
 {
  date:"10-06-2022",
  session:"09:30-10:15",
  lesson:"Maths",
  unit:"unit-1"
 },
 {
  date:"10-06-2022",
  session:"09:30-10:15",
  lesson:"English",
  unit:"unit-1"
 },
 {
  date:"10-06-2022",
  session:"09:30-10:15",
  lesson:"Tamil",
  unit:"unit-1"
 }
]}

//tomorrow schedule------------------------------>
router.get("/",(req,res)=>{
    try{
        res.status(200).send(tomorrowSchedule);
    }catch(error)
    {
        res.json({message:"unable to create"});
  
    }
  
  });
  // specific data
  router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Schedule.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          tomorrowSchedule:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
  )
  })
  router.post("/",async(req,res)=>{
      try{
       const tomorrowdetails={
        schedule:req.body.schedule
  
              
          };
          console.log(tomorrowdetails);
          const tomorrowSchedule=new Schedule(tomorrowdetails);
  const tomorrowScheduleCreated=await tomorrowSchedule.save();
  if(tomorrowScheduleCreated){
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
      Schedule.findOneAndUpdate({_id:req.params.id},{
          $set:{
             
            schedule:req.body.schedule
              
              
          }
      })
      .then(result=>{
          res.status(200).json({
              updated_tomorrowScheduleDetails:result       
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
          Schedule.deleteOne({_id:req.params.id},{
              $set:{
                 
                schedule:req.body.schedule
              
                  
              }
          })
          .then(result=>{
              res.status(200).json({
                  Deleted_tomorrowScheduleDetails:result       
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
    
            Schedule.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
          export default router;