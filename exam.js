import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
// app.use(express.json());

// connectDB();
const upcommingexam={
    upcommingexam:[
       {
              examname:"Annual Exam",
              time:"10.00AM to 12.30PM",
              date:"1/3/2023 to 10/3/2023",
              total_mark:"100",
              passing_mark:"35",
              viewtimetable:{
                     date:"1/3/2023",
                     subject:"Language 1",
                     syllabus:"5 units"
    
              },
  
       }
 
         ]}

mongoose.set("strictQuery", false);
const viewtimetableSchema=mongoose.Schema([{
    date:{
          type:String,
          required:true
        },
subject:{
        type:String,
        required:true
        } ,
 syllabus:{
          type:String,
          required:true
        },
    }])
const upcommingexamSchema=mongoose.Schema({
    upcommingexam:[
    {
        examname:{
            type:String,
           required:true,
        },            
        time:{
            type:String,
            required:true
        },            
        date:{
        type:String,
        required:true
    },            
    total_mark:{
        type:String,
        required:true
      
    },            
    passing_mark:{
        type:String,
        required:true
      
    },    
    viewtimetable:{
        type:viewtimetableSchema,        
    }}]
})
 
 var Upcommingexam = mongoose.model('upcommingexam', upcommingexamSchema);
 upcommingexamSchema.plugin(Upcommingexam);
 


 router.get("/",(req,res) =>
{
    try{
        res.status(200).send(upcommingexam);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Upcommingexam.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
           upcommingexam:result
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
        const upcommingexam={
        //     examname:req.body.examname,
        //     time:req.body.time,
        //     date:req.body.date,
        //     total_mark:req.body.total_mark,
        //     passing_mark:req.body.passing_mark,
        //    viewtimetable:req.body.viewtimetable
         upcommingexam:req.body.upcommingexam  
        }
        console.log(upcommingexam);
        var create=new Upcommingexam(upcommingexam);
        var upcommingexamCreated=await create.save();
      
        if(upcommingexamCreated){
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
    Upcommingexam.findOneAndUpdate({_id:req.params.id},{
        $set:{
            upcommingexam:req.body.upcommingexam 
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_upcommingexam:result       
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
        Upcommingexam.deleteOne({_id:req.params.id},{
            $set:{
               
                upcommingexam:req.body.upcommingexam 
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_upcommingexam:result       
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
    
            Upcommingexam.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
       
        export default router;