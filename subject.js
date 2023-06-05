import express from "express";
import mongoose from "mongoose";
const router=express.Router();

const subjectSchema=mongoose.Schema({
    subject:[
    {
        subjectName:{
            type:String,
            required:true
                 },
        subjectTeacher:{
             type:String,
             required:true
                },
        schedule:[
            {
                testOrTask   :{
                    type:String,
                    required:true
                },
                Unit:{
                    type:String,
                    required:true
                },
                Date     :{
                        type:String,
                        required:true
                    },
                Mark         : {
                        type:String,
                        required:true
                    },
                Result       : {
                        type:String,
                        required:true
                    }
            }]
        
    }]}
)

const Subject=mongoose.model("Subject",subjectSchema);
subjectSchema.plugin(Subject);

const subjects={
    subject:[
     {
       subjectName   : "Tamil",
       subjectTeacher: "Mr.Damodaran",
       schedule:[{
                testOrTask:"completed test",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",
            },
            {
                testOrTask:"upcomming test",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",                    
            },
            {
                testOrTask:"completed task",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",
            },
            {
                testOrTask:"upcomming task",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",          
            },
       ]
       
    },
    {
        subjectName   : "English",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
     {
        subjectName   : "Maths",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
     {
        subjectName   : "Science",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
     {
        subjectName   : "Social",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
]}
//all data
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(subjects);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Subject.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            subjects:result
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
        const details= 
                {
                   subject:req.body.subject
               }
               
            
console.log(details);
 const menu=new Subject(details);
const subjectCreated=await menu.save();
if(subjectCreated){
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
    Subject.findOneAndUpdate({_id:req.params.id},{
        $set:{
        
            
            subject:req.body.subject
            
                  
                   
                }
            
            })
            .then(result=>{
                res.status(200).json({
                    updated_subjects:result       
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
        Subject.deleteOne({_id:req.params.id},{
            $set:{
               
                subject:req.body.subject
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_subjects:result       
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
    
        Subject.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
    
        // router.delete("/",(req,res)=>{
    
        //     Subject.deleteMany({}).then(function(){
        //         console.log("Data deleted");
        //     }).catch(function(error){
        //         console.log(error);
        //     })
        // })
        
        
        
    

 export default router;