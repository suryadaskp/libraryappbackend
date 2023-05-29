const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


mongoose.connect("mongodb+srv://suryadas9072:suryadas9072@cluster0.mst02f6.mongodb.net/?retryWrites=true&w=majority")

let Schema = mongoose.Schema;

const userSchema = new Schema({
    sname:String,
    splace:String,
    sage:Number,
    semail:{type:String,
        unique:true,
        required:true,
    },
    scd:String,
    spno:Number,
    spassword:{
        type:String,
        required:true,
    },
    sterms:Boolean,
    cpassword:String
});

userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('spassword')) {
      return next();
    }
  
    try {
      // Generate a salt for password hashing
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(this.spassword, salt);
  
      // Replace the plaintext password with the hashed password
      this.spassword = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  // Method to compare the provided password with the stored hashed password
  userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.spassword);
    } catch (error) {
      throw error;
    }
  };

var usermodel = mongoose.model("users", userSchema);

module.exports = usermodel;




