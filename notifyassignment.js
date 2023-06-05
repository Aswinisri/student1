import express from "express";
import mongoose from "mongoose";
const router=express.Router();

const assignmentSchema=mongoose.Schema({
    assignment:[
      {
         subject:{
          type:String,
          required:true
         },
         lesson:{
          type:String,
          required:true
         },
         assignment:{
          type:String,
          required:true
         }
  }]
  })
  
  var Assignment=mongoose.model("Assignment",assignmentSchema);
  assignmentSchema.plugin(Assignment);
  
  const assignment={
      assignment:[
      {
          subject:"Tamil",
          lesson:"unit-3",
          assignment:"Ex:15"
        },
        {
            subject:"English",
            lesson:"unit-3",
            assignment:"Ex:15"
          },
          {
            subject:"Maths",
            lesson:"unit-3",
            assignment:"Ex:15"
          },
          {
            subject:"Science",
            lesson:"unit-3",
            assignment:"Ex:15"
          },
          {
            subject:"History",
            lesson:"unit-3",
            assignment:"Ex:15"
          },
  ]}

  //assignment-------------------------------->
router.get("/",(req,res)=>{
    try{
        res.status(200).send(assignment);
    }catch(error)
    {
        res.json({message:"unable to create"});
  
    }
  
  });
  // specific data
  router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Assignment.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          assignment:result
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
     const assignmentdetails={
              
              assignment:req.body.assignment
            
        };
        console.log(assignmentdetails);
        const assignment=new Assignment(assignmentdetails);
  const assignmentCreated=await assignment.save();
  if(assignmentCreated){
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
    Assignment.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
          
          assignment:req.body.assignment
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_assignmentDetails:result       
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
        Assignment.deleteOne({_id:req.params.id},{
            $set:{
               
              
              assignment:req.body.assignment
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_assignmentDetails:result       
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
    
          Assignment.deleteMany({}).then((result) => {
              res.send(result);
          })
      });
        export default router;