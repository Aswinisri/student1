import express from 'express';

const router = express.Router();
import multer from "multer";
import ImageModel from './imagemodel.js'

const Storage = multer.diskStorage({
    destination: './student/gallery_img',
    filename: (req, file, cb) => {
     cb(null,file.originalname);
    },
});

const upload = multer({
    storage: Storage,
   
}).single('testImage')
const image={
    imageDetail:[{
    name:"By Devipriya",
    image:{
        
      data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\gallery\gallery\WhatsApp Image 2023-02-24 at 11.39.33 AM (32).jpeg",
      contentType:"image/jpeg"
    }
},
{
 name:"By Aswini",
        image:{
            
    data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\gallery\gallery\WhatsApp Image 2023-02-24 at 11.39.33 AM (15).jpeg",
    contentType:"image/jpeg"
        
    }  
},
{
    name:"By rathiga",
    image:{
        
data:"C:\Users\Dell\OneDrive\Desktop\otp-main\student\gallery\gallery\WhatsApp Image 2023-02-24 at 11.39.33 AM (5).jpeg",
contentType:"image/jpeg"
    }
},

]}
router.get("/",(req,res)=>{
    res.send(image);
})



router.get('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            ImageModel.findById({_id:req.params.id},{
               imageDetail:req.body.imageDetail,
                })
            }})
          
            .then(result=>{
                res.status(200).json({
                   images:result
                })
            })
            .catch(err=> {
            console.log(err);
            res.status(505).json({
                error:err
            })
            }
          )
        }
)
    

router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage = new ImageModel({
                imageDetail:req.body.imageDetail,
            })
            newImage.save()
        .then(()=>res.send('successfully uploaded')).catch(err=>console.log(err))
        }
    })
    
})
router.put('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            ImageModel.findOneAndUpdate({_id:req.params.id},{
                imageDetail:req.body.imageDetail,
            })
          
            .then(result=>{
                res.status(200).json({
                    updated_image:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })
    
})
router.delete('/:id',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            ImageModel.deleteOne({_id:req.params.id},{
                imageDetail:req.body.imageDetail,
            })
          
            .then(result=>{
                res.status(200).json({
                   deleted_image:result       
                 })
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error:err
                })
            })
        
        }
    })
    
})
router.delete("/",(req,res)=>{
    
    ImageModel.deleteMany({}).then((result) => {
            res.send(result);
        })
    });

export default router;