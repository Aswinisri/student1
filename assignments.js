import express from "express";
import mongoose from "mongoose";
import multer from "multer";
const router=express.Router();

const assignmentSchema=mongoose.Schema({
    assignmentFile:[
        {
            Subject:{
                  type:String,
                  required:true
            },
            Assignment:{
                type:String,
                required:true
            },
            AssignmentDate:{
                type:String,
                required:true
          },
            SubmissionDate:{
                type:String,
                required:true
           },
           SubmissionStatus:{
            type:String,
            required:true
           },
        }
    ]
})
const Assign=mongoose.model("Assign",assignmentSchema);
assignmentSchema.plugin(Assign);

const assignmentFile={
    assignmentFile:[
        {
            Subject:"English",
            Assignment:"FA1",
            AssignmentDate:"02/03/2023",
            SubmissionDate:"07/03/2023",
            SubmissionStatus:"Pending..."
        },
        {
            Subject:"Computer",
            Assignment:"FA1",
            AssignmentDate:"02/03/2023",
            SubmissionDate:"07/03/2023",
            SubmissionStatus:"Pending..."
        },
        
    ]
}

//upload

const app=express();
app.use(express.json());

const Storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')

//download
app.set("view engine","ejs");

app.use(express.static("public"));
router.get('/data',(req,res)=>{
res.render("data");
})
router.get('/download-file',(req,res)=>{
    res.download("./book/Nodejs contents 1.pdf");
})

//get
router.get("/",(req,res)=>{
    try{
        res.status(200).send(assignmentFile);
    }catch(error)
    {
        res.json({message:"unable to create"});
  
    }
  
  });
  // specific data
  router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Assign.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          assignmentFile:result
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
              
              assignmentFile:req.body.assignmentFile
            
        };
        console.log(assignmentdetails);
        const menu=new Assign(assignmentdetails);
  const assignmentCreated=await menu.save();
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
    Assign.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
          
            assignmentFile:req.body.assignmentFile
            
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
        Assign.deleteOne({_id:req.params.id},{
            $set:{
               
              
                assignmentFile:req.body.assignmentFile
                
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
    
            Assign.deleteMany({},(err,result)=>{
            if(err) throw err
            res.send(assignmentFile)
            })
        }) 
        export default router;




// const upload = multer({ dest: os.tmpdir() });

// router.post('/upload', upload.single('file'), function(req, res) {
//   const title = req.body.title;
//   const file = req.file;

//   console.log(title);
//   console.log(file);

//   res.sendStatus(200);
// });
