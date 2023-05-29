const mongoose = require("mongoose");;

mongoose.connect("mongodb+srv://suryadas9072:suryadas9072@cluster0.mst02f6.mongodb.net/?retryWrites=true&w=majority")

let Schema = mongoose.Schema;

const adminSchema = new Schema({
    username:String,
        
    password:String,
       
});




const bookSchema = new Schema({
    bookno:{
      type:Number,
      unique:true,
      required:true,
    },
    bookname:{
      type:String,
      required:true,
    },
    genre:{
      type:String,
      required:true,
    },
    author:{
      type:String,
      required:true,
    },
    isbn:{
      type:String,
      unique:true,
      required:true,
    },
    publicationYear:{
      type:String,
      required:true,
    },
    price:{
      type:Number,
      required:true,
    },
    description:String,
    status:{
      type:String,
      enum:["Available","Rented","Sold"],
      default:"Available",
    },
  
  });
  
  
  
  var adminmodel = mongoose.model("admin", adminSchema);
  var bookmodel = mongoose.model("books", bookSchema);
  
  module.exports = {
      bookmodel,
      adminmodel,
     
  }