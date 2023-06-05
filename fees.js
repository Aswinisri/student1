import express from "express";
// import connectDB from "./db.js";
import mongoose from "mongoose";
const router=express.Router();
mongoose.set("strictQuery", false);
// connectDB();
const feesSchema=mongoose.Schema({
    feeDetails:[{
    fees:{
        type:String,
        required:true
    },
    totalFee:{
        type:String,
        required:true
    },
    paidFee:{
        type:String,
        required:true
    },
    lateFeeCharges:{
        type:String,
        required:true
    },
    dueFee:{
        type:String,
        required:true
    },
}]})
    

const FeeDetails=mongoose.model("FeeDetails",feesSchema);
feesSchema.plugin(FeeDetails);

const feeDetails={
    feeDetails:[{
        fees:"Admission Fee",
        totalFee:"Rs.500",
        paidFee:"Rs.100",
        lateFeeCharges:"Rs.00.00",
        dueFee :"Rs.400",
    },

{
         fees:"Examination Fee",
         totalFee:"Rs.500",
         paidFee:"Rs.100",
         lateFeeCharges:"Rs.00.00",
         dueFee :"Rs.400",
    },

{
        fees:"Library Fee",
        totalFee:"Rs.500",
        paidFee:"Rs.100",
        lateFeeCharges:"Rs.00.00",
        dueFee :"Rs.400",
    
},
{
        fees:"Miscellaneous Fee",
        totalFee:"Rs.500",
        paidFee:"Rs.100",
        lateFeeCharges:"Rs.00.00",
        dueFee :"Rs.400",
    
}]}
     

// app.use(express.json());
router.get("/",(req,res)=>{
    try{
        res.status(200).send(feeDetails);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
router.get("/:id",(req,res)=>{
    console.log(req.params.id);
    Fee.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            feeDetails:result
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
        const details=  {
                  feeDetails:req.body.feeDetails  
               }
               
            
console.log(details);
 const fees=new FeeDetails(details);
const feeDetailsCreated=await fees.save();
if(feeDetailsCreated){
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
    FeeDetails.findOneAndUpdate({_id:req.params.id},{
        $set:{
            feeDetails:req.body.feeDetails 
        }
            
            })
            .then(result=>{
                res.status(200).json({
                    updated_feeDetails:result       
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
        FeeDetails.deleteOne({_id:req.params.id},{
            $set:{
                feeDetails:req.body.feeDetails 
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_feeDetails:result       
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
    
            FeeDetails.deleteMany({}).then((result) => {
                    res.send(result);
                })
            });

export default router;       
