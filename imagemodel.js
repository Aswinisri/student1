import mongoose from "mongoose"
const ImageSchema=mongoose.Schema({
  imageDetail:[
    {
  name:{
    type:String,
   required:true,
},
   
image:{
    data:String,
    contentType: String
}
            
           
   } ]} )
// module.exports = ImageModel = mongoose.model('imageModel',ImageSchema)
// export default ImageModel;
const ImageModel =mongoose.model("ImageModel ",ImageSchema);
export default ImageModel ;
