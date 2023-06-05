import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
mongoose.set('strictQuery', false);
const eventSchema=mongoose.Schema({
    event:[
        {
            image:{
                data:String,
                contentType: String
            },
             date:{
                 type:String,
                 required:true
  
                  },  
            day:{
                 type:String,
                 required:true
  
                },
        function:{
                type:String,
                required:true
 
                 },
        }
 ]})
const Event=mongoose.model("Event",eventSchema);
eventSchema.plugin(Event);

// connectDB();
const router=express.Router();
// app.use(express.json());

const event={
    event:[{
        image:{
            data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\event\Events\WhatsApp Image 2023-02-24 at 11.39.33 AM (8).jpeg",
            contentType:"image/jpeg",
        },
         date:"26-01-2022",
         day:"tuesday",
         function:"coding class",
},{
    image:{
        data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\event\Events\WhatsApp Image 2023-02-24 at 11.39.33 AM (11).jpeg",
        contentType:"image/jpeg",
    },
     date:"26-01-2022",
     day:"tuesday",
     function:"coding class",
},]}




router.get("/",(req,res) =>
{
    try{
        res.status(200).send(event);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Event.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            event:result
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
        const event={
        
            event:req.body.event
        }
      
        
        console.log(event);
       
        var create=new Event(event);
        var eventCreated=await create.save();

   if(eventCreated){
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
    Event.findOneAndUpdate({_id:req.params.id},{
        $set:{
            event:req.body.event
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_event:result       
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
        Event.deleteOne({_id:req.params.id},{
            $set:{
                event:req.body.event
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_event:result       
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
    
            Event.deleteMany({}).then((result) => {
                res.send(result);
            })
        });
export default router;