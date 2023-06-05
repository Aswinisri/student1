import express from "express";
import mongoose from "mongoose";
// import connectDB from "./db.js";
mongoose.set("strictQuery", false);
// connectDB();
const router=express.Router();
const AddressSchema = mongoose.Schema({
    houseNumber: {
        type:String,
    },
    street: {
        type:String,

    },
    city: {
        type:String,

    },
    State:{
        type:String,
    },
    Pincode:{
        type:String
    }
  });
const profileSchema=mongoose.Schema({
    profile:[{
    image:{
        data:String,
        contentType: String
    },
    Name:{
        type:String,
        required:true
    },
    RollNo:{
        type:String,
        required:true
    },
    ContactNo:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    BloodGroup:{
        type:String,
        required:true
    },
    FatherName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Address:{
        type:AddressSchema,
        required:true
    }

}]})
var Profile = mongoose.model('Profile',profileSchema);
profileSchema.plugin(Profile);
const profile={
    profile:[{
    image:{
        data:"C:\\Users\\Dell\\OneDrive\\Desktop\\otp-main\\student\\profile\\profile\\1K2A0787.png",
        contentType:"image/png",
    },
    Name     :"Harish",
    RollNo   :"610818106010",
    ContactNo:"9448983789",
    class    :"8th",
    section  :"A",
    BloodGroup:"B+",
    FatherName:"Arron",
    Email     :"abc@gmail.com",
    Address   :{
        houseNumber:"G-36",
        street: "1st cross",
        city:"Chennai",
        State:"TamilNadu",
        Pincode:"5600035"
     }

},
{
    image:{
        data:"C:\\Users\\Dell\\OneDrive\\Desktop\\otp-main\\student\\profile\\profile\\1K2A0872.png",
        contentType:"image/png",
    },
     Name     :"Hemprasad",
     RollNo   :"610818106010",
     ContactNo:"9448983789",
     class    :"8th",
     section  :"A",
     BloodGroup:"B+",
    FatherName:"Arron",
    Email     :"abc@gmail.com",
    Address   :{
          houseNumber:"G-36",
          street: "1st cross",
          city:"Chennai",
          State:"TamilNadu",
          Pincode:"5600035"
 }

}]}
// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(profile);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
  console.log(req.params.id);
  Profile.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          profile:result
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
      const profile={
       profile:req.body.profile
      }
      console.log(profile);
      const menu=new Profile(profile);
      const profileCreated=await menu.save();
      if(profileCreated){
        console.log("Created");
        res.status(201).json({message:"Profile available"});
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
  Profile.findOneAndUpdate({_id:req.params.id},{
      $set:{
        profile:req.body.profile
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_profileDetails:result       
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
    Profile.deleteOne({_id:req.params.id},{
        $set:{
            profile:req.body.profile
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_profileDetails:result       
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
    
        Profile.deleteMany({}).then((result) => {
            res.send(result);
        })
    });
export default router;