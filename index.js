const express = require("express");
const { bookmodel,adminmodel} =  require('./adminmodel');
const usermodel = require('./model');
const cors = require('cors');

const app= new express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.post('/create',(req,res)=>{

    
    const { sname, splace, sage, semail, scd, spno, spassword, cpassword } = req.body;

    if (!sname || !splace || !sage || !semail || !scd || !spno || !spassword || !cpassword ) {
      res.status(400).send("Please fill in all fields.");
      return;
    }

    if(spassword !==cpassword){
        res.status(400).send("password do not match");
      return;
    }

    var result = new usermodel(req.body);
    result.save();
    res.send("data added")
})


app.post('/Login', async (req, res) => {
    const { semail, spassword } = req.body;
    if (!semail || !spassword) {
      res.send('Please fill in all fields.');
      return;
    }
    try {
        // Assuming you have a user collection in your database
        const user = await usermodel.findOne({semail:semail});
        if (!user) {
          res.send('Email not found.');
          return;
        }
        
    
        // Compare the provided password with the stored password
        const isPasswordValid = await user.comparePassword(spassword);
        if (!isPasswordValid) {
          
          res.send('Invalid password.');
          return;
        }
    
        // Password and email are valid
        // Proceed with successful login logic
        res.send('Login successful!');
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
      }
   
   
  });
  
  app.post("/AdminLogin", async (req, res) => {
    const { username, password } = req.body;
  
    if(!username || !password) {
      res.send('Please fill in all fields.');
      return;
    }



    // Check if the provided username and password match the predefined admin credentials
    if (username === "admin" && password === "adminpassword") {
      res.send("Admin Logged in Successfully");
    }  
    
      else{
        res.send("Invalid Username or Password");
      }
    
   
    
  });
  





app.get("/View",async (req,res)=>{
    var data = await  usermodel.find()
    res.json(data);
})

app.get("/Viewbook",async (req,res)=>{
    var data = await  bookmodel.find()
    res.json(data);
})

app.delete('/deletebook/:id',async (req,res)=>{
    var id=req.params.id;
    await bookmodel.findByIdAndDelete(id);
    res.send("delete");
})

app.delete('/deleteuser/:id',async (req,res)=>{
    var id=req.params.id;
    await usermodel.findByIdAndDelete(id);
    res.send("delete");
})

app.put('/updatebook/:id',async (req,res)=>{
    let id=req.params.id;
    await bookmodel.findByIdAndUpdate(id,req.body);
    res.send("updated");
})

app.put('/updateuser/:id',async (req,res)=>{
    let id=req.params.id;
    await usermodel.findByIdAndUpdate(id,req.body);
    res.send("updated");
})
app.post('/add',(req,res)=>{
    var result = new bookmodel(req.body)
    result.save()
    res.send("data added");
})


app.listen(3002,()=>{
    console.log("port is running")
})



