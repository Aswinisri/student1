import express, { Router } from "express";
import mongoose from "mongoose";
const router=express.Router();
const app=express();
app.use(express.json());
mongoose.set("strictQuery", false);
const homeworkSchema=mongoose.Schema(
    {
        homework:[{
            monthAndYear:{
                type:String,
                required:true
            },
            class:{
                type:String,
                required:true
            },
            subject :{
                type:String,
                required:true
            },
            dateOfHomework:{
                type:String,
                required:true
            },
            dateOfSubmit:{
                type:String,
                required:true
            },
            status :{
                type:String,
                required:true
            }
     }]
    }
)

const Homework=mongoose.model("Homework",homeworkSchema);
homeworkSchema.plugin(Homework);
const homework={
    homework:[
        {
          monthAndYear          :"January",
          class                 :"1st Standard",
          subject               :"English",
          dateOfHomework        :"23-9-2022",
          dateOfSubmit          :"25-9-2022",
          status                :"pending"          
      },
      {
        monthAndYear         :"February",
        class          :"1st Standard",
        subject        :"English",
        dateOfHomework :"23-9-2022",
        dateOfSubmit   :"25-9-2022",
        status         :"pending"          
    },
   {
         monthAndYear   :"March",
         class          :"1st Standard",
         subject        :"English",
         dateOfHomework :"23-9-2022",
         dateOfSubmit   :"25-9-2022",
          status         :"pending"          
   }
]
}

//download

app.set("view engine","ejs");

app.use(express.static("public"));
router.get('/data',(req,res)=>{
res.render("data");
})
router.get('/download-file',(req,res)=>{
    res.download("./book/Nodejs contents 1.pdf");
})
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(homework);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Homework.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            homework:result
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
            homework:req.body.homework
            
        };
        console.log(Details);
        const menu=new Homework(Details);
const homeworkCreated=await menu.save();
if(homeworkCreated){
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
    Homework.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            homework:req.body.homework
            
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
    Homework.deleteOne({_id:req.params.id},{
        $set:{
           
            homework:req.body.homework 

        }
    })
    .then(result=>{
        res.status(200).json({
            deleted_Details:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })

// router.delete('/:id',(req,res)=>{
//         console.log(req.params.id);
//         Homework.findByIdAndRemove({_id:req.params.id},{
//             $set:{
               
//                 homework:req.body.homework
                
//             }
//         })
//         .then(result=>{
//             res.status(200).json({
//                 Deleted_Details:result       
//              })
//         })
//         .catch(err=>{
//             console.log(err)
//             res.status(500).json({
//                 error:err
//             })
//         })
//         })
        router.delete("/",(req,res)=>{
    
            Homework.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
    
    
export default router;
