import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router =express.Router();


mongoose.set("strictQuery", false);

const complaintSchema=mongoose.Schema({
        comment:{
            type:String,
            required:true
        }
    }
)
const Complaint=mongoose.model("Complaint",complaintSchema);
complaintSchema.plugin(Complaint);
// connectDB();
// app.use(express.json());
const complaint={
    comment:"Regarding Attendance"
    }

//get
router.get("/",(req,res) =>
{
    try{
        res.status(200).send(complaint);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Complaint.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            complaint:result
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
        const complaint={
          comment:req.body.comment
            
        }
      
        
        console.log(complaint);
       
        var create=new Complaint(complaint);
        var complaintCreated=await create.save();

   if(complaintCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
router.put('/:id',(req,res)=>{
    console.log(req.params.id);
    Complaint.findOneAndUpdate({_id:req.params.id},{
        $set:{
            comment:req.body.comment
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_complaint:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    router.delete("/:id",(req,res)=>{
        console.log(req.params.id);
        Complaint.deleteOne({_id:req.params.id},{
            $set:{
                comment:req.body.comment
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_complaint:result       
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
    
            Complaint.deleteMany({}).then((result) => {
                    res.send(result);
                })
            });
export default router;