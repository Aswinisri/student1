import express from "express";
import mongoose from "mongoose";
const router=express.Router();

const todayclassSchema=mongoose.Schema({
    class:[  {
         subject:{
          type:String,
          required:true
         },
         lesson:{
          type:String,
          required:true
         },
         range:{
          type:String,
          required:true
         }
  }]
  })
  
  var Todayclass=mongoose.model("Todayclass",todayclassSchema);
  todayclassSchema.plugin(Todayclass);
  
  const todayclass={
    class:[
      {
        subject:"Tamil",
        lesson:"unit-3",
        range:"completed"
      },
      {
          subject:"English",
          lesson:"unit-3",
          range:"completed"
        },
        {
          subject:"Maths",
          lesson:"unit-3",
          range:"completed"
        },
        {
          subject:"Science",
          lesson:"unit-3",
          range:"completed"
        },
        {
          subject:"History",
          lesson:"unit-3",
          range:"completed"
        },
  ]}

  //todayclass-------------------->
router.get("/",(req,res)=>{
    try{
        res.status(200).send(todayclass);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Todayclass.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          todayclass:result
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
//post
router.post("/",async(req,res)=>{
  try{
   const todayclassdetails={
       class:req.body.class
          
      };
      console.log(todayclassdetails);
      const todayclass=new Todayclass(todayclassdetails);
const todayclassCreated=await todayclass.save();
if(todayclassCreated){
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
  Todayclass.findOneAndUpdate({_id:req.params.id},{
      $set:{
         
        class:req.body.class

          
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_todayclassDetails:result       
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
      Todayclass.deleteOne({_id:req.params.id},{
          $set:{
             
            class:req.body.class

              
          }
      })
      .then(result=>{
          res.status(200).json({
              Deleted_todayclassDetails:result       
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
    
        Todayclass.deleteMany({}).then((result) => {
            res.send(result);
        })
    });
      export default router;  