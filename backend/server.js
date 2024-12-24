const express = require('express')
const app= express()
const cors=require('cors')
// const nodemailer=require('nodemailer')
const port=5000;
const qr = require('qrcode'); // Import qrcode library
const sendSMS=require('./sendmessage')
const mongoose=require('mongoose')
const Usermodel=require('./Schema/schema')
const bloodmodel=require('./Schema/request')
const cmpModel=require('./Schema/camp')
const sendEmails =require('./sendMail');
const sendEmailsblood=require('./sendemailblood')
// const sendEmailsblood = require('./sendemailblood');
// mongoose.connect('mongodb://127.0.0.1:27017/trt')
//mongodb+srv://pratham:<password>@navvikas.ydwytsk.mongodb.net/?retryWrites=true&w=majority&appName=Navvikas
mongoose.connect('mongodb+srv://move:move@cluster0.a8ihf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log(" --> Connected to Db"))
.catch((e)=>{console.log(e)})
// mongodb://localhost:27017
app.use(express.json());
app.use(cors());

app.get('/helo',(req,res)=>{
    res.status(201).send({message:"hello"})
})

app.post('/register', async(req,res)=>{
   
    try{
        const newuser= new Usermodel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
            age:req.body.age,
            location:req.body.location,
            blood:req.body.blood, //here
            phone:req.body.phone
        })

       await newuser.save();
       
       res.status(201).json({ message: 'Registration successful' });
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.post('/login',async (req,res)=>{
    const {email,password,role}=req.body;
    try{

        const user = await Usermodel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (password === user.password) {
            console.log(user.role)
            if(user.role === "admin"){
                res.status(200).json({ message: "welcome to admin panel !",role:"admin" });
                
            }else{

                res.status(200).json({ message: "User logged in successfully!",role:"" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    }catch(e){
        console.error('Error logging in:');
        res.status(500).json({ message: 'Internal server error' });
  
    }

})

app.get('/api/users', async (req, res) => {
    try {
        const users = await Usermodel.find();
        
        if (!users || users.length === 0) {
          return res.status(404).json({ error: 'No users found' });
        }
        res.json(users);
      } catch (error) {
        console.error('Error fetching user list:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });
  

// adding the camp details in this route
  app.post('/addcamp', async (req, res) => {
    try {
        
        const { location, timing, date, docname, desc } = req.body;
        const existingCamp = await cmpModel.findOne({ location, time: timing, date });
        
        
        if (existingCamp) {
          
            return res.status(400).json({ error: 'Duplicate data found' });
        }
       
        const newCamp = new cmpModel({
            location: location,
            time: timing,
            date: date,
            docname:docname,
            desc :desc
        });

     
        await newCamp.save();


       const usersInLocation = await Usermodel.find({ location: location });
        console.log(usersInLocation+"\n******   end *****\n");
        // const d=usersInLocation.length;

        sendEmails(usersInLocation,newCamp);//changed
        const phoneNumbers = usersInLocation.map(user => user.phone);
        console.log(phoneNumbers);
        
        // Send SMS to each user in the location
        for (const user of usersInLocation) {
            await sendSMS(user, newCamp); // assuming newCamp contains the camp details
        }
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// fetching the details of the camp in this route
app.get('/getcamp',async(req,res)=>{
    try {
     
        const camps = await cmpModel.find();

      
        res.status(200).json(camps);
    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
})

app.delete('/deletecamp/:id', async (req, res) => {
    try {
        const { id } = req.params;

      
        const deletedCamp = await cmpModel.findByIdAndDelete(id);

        if (!deletedCamp) {
            return res.status(404).json({ error: 'Camp not found' });
        }

       
        res.status(200).json({ message: 'Camp deleted successfully' });
    } catch (error) {
     
        res.status(500).json({ error: error.message });
    }
});
app.post('/blood' ,async (req,res) =>{
    const { location, timing, date, blood,unit} = req.body;
        const existingCamp = await bloodmodel.findOne({ location, time: timing, date, blood,unit});
        
        
        if (existingCamp) {
          
            return res.status(400).json({ error: 'Duplicate data found' });
        }
       
        const newCampp = new bloodmodel({
            location: location,
            time: timing,
            date: date,
            blood:blood,
            unit:unit
        });

     
        await newCampp.save();
        const qrText = `Location: ${location}\nTime: ${timing}\nDate: ${date}\nBlood Group: ${blood}\nUnits Required: ${unit}`;
        const qrImageBuffer = await qr.toBuffer(qrText, { type: 'jpg' });

        // Send email with QR code
        const usersInLocation = await Usermodel.find({ location: location });
        sendEmailsblood(usersInLocation, newCampp, qrImageBuffer);

});
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Usermodel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(port,()=>console.log(`listening to port ${port}`))