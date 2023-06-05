import  express  from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
const router=express.Router();
mongoose.set("strictQuery", false);
// connectDB();
const sportsSchema=mongoose.Schema({
    sports:[{
        image:{
            data:String,
            contentType: String
        },
    events:{
        type:String,
        required:true
         },
    recentEvent:{
        type:String,
        required:true
    },
    venue:{
            type:String,
            required:true
        },
    achievement:{
        type:String,
        required:true
            },
    position:{
        type:String,
        required:true
         }       
         }]})

 const Sports=mongoose.model('sports',sportsSchema);
 sportsSchema.plugin(Sports);

const sports={
    sports:[{
        image:{
            data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\sports\Sports\side-view-male-swimmers-swimming-pool.png",
            contentType:"image/png",
        },
       events:"Upcomming Competitions",
       recentEvent:"Swimming contest",
       venue:"Star Stadium",
       achievement:"Running Race",
       position:"1st place"
},
{
    image:{
        data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\sports\Sports\basketball-players-big-professional-arena-during-game.png",
        contentType:"image/png",
    },
   events:"Upcomming Competitions",
   recentEvent:"Basketball contest",
   venue:"Star Stadium",
   achievement:"Running Race",
   position:"1st place"
}]}
//get
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(sports);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Sports.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          sports:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
)
});
//post
router.post("/",async(req,res)=>{
    try{
      const sports={
       sports:req.body.sports
      };
      console.log(sports);
      const menu=new Sports(sports);
      const sportsCreated=await menu.save();
      if(sportsCreated){
        console.log("Created");
        res.status(201).json({message:"request created"});
    }else
    {
        res.status(401);
        throw new Error("not available");
    }
  } catch (err){
          return res.status(500).json({message: err.message});
        }});
//update
router.put('/:id',(req,res)=>{
  console.log(req.params.id);
  Sports.findOneAndUpdate({_id:req.params.id},{
      $set:{
        sports:req.body.sports
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_sportsDetails:result       
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
    Sports.deleteOne({_id:req.params.id},{
        $set:{
            sports:req.body.sports
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_sportsDetails:result       
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
    
        Sports.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
export default router;