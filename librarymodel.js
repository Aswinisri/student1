import mongoose from "mongoose";
const librarySchema=mongoose.Schema(
    {
        collections:[{
    bookname:{
        type:String,
        required:true
       
        },
    category:{
         type:String,
         required:true
      
     },
     authorname:{
        type:String,
        required:true
      
    },               
}]         
           
     })
const Library=mongoose.model("Library",librarySchema);
export default Library;
