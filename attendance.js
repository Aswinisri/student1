import express from "express";
import mongoose from "mongoose";
const router=express.Router();

mongoose.set("strictQuery", false);
const attendanceSchema=mongoose.Schema( {
    attendanceFile:[{
            totalWorkingDays:{
                type:String,
                required:true
            },
            attendedDays :{
                type:String,
                required:true
            },
            absentDays  :{
                type:String,
                required:true
            },
            schedule:[{
                monthAndYear:{
                    type:String,
                    required:true
                },
                totalDays:{
                    type:String,
                    required:true
                },
                officialLeaves:{
                    type:String,
                    required:true
                },
    }]
               }]
            })

const Attendance=mongoose.model("Attendance",attendanceSchema);
attendanceSchema.plugin(Attendance);
const attendanceFile={
    attendanceFile:[{
              totalWorkingDays:"100",
              attendedDays:"74",
              absentDays:"3",
              schedule:[{
                monthAndYear:"June 2022",
                totalDays:"26 Days",
                officialLeaves:"6 Days"
              }]
         },
          {
            totalWorkingDays:"100",
            attendedDays:"74",
            absentDays:"3",
            schedule:[{
              monthAndYear:"June 2022",
              totalDays:"26 Days",
              officialLeaves:"6 Days"
            }]
        },
       {
             totalWorkingDays:"100",
             attendedDays:"74",
             absentDays:"3",
             schedule:[{
                 monthAndYear:"June 2022",
                 totalDays:"26 Days",
                 officialLeaves:"6 Days"
            }]
   }]
                }


// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(attendanceFile);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Attendance.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            attendanceFile:result
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
        const Details={
           attendanceFile:req.body.attendanceFile
        };
        console.log(Details);
        const menu=new Attendance(Details);
const attendanceCreated=await menu.save();
if(attendanceCreated){
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
    Attendance.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
          
            attendanceFile:req.body.attendanceFile
            
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_Details:result       
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
        Attendance.deleteOne({_id:req.params.id},{
            $set:{
               
              
                attendanceFile:req.body.attendanceFile
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_Details:result       
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
    
            Attendance.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
        export default router;
