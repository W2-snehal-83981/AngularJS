const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//import pool from './db.js';
const { Pool } = require('pg');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

//db connection
const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    port: 5432,
    database:'user_management',
    password:'password'
});

// API
//The RETURNING * in the SQL query allows you to retrieve all the fields of the newly inserted row after the INSERT INTO operation.
//fetch all users
app.get('/users/getusers', async (req,res) => {
  try{
    const result = await pool.query('select * from Users');
    res.json(result.rows);
  }
  catch(error){
    console.log(error);
    res.status(500).send('Server Error');
  }
});

//login
app.post('/users/login',async (req,res) => {
    const {email,password} = req.body;
    try{
        const result = await pool.query('select * from Users where email=$1 and password=$2',[email,password]);
        if(result.rows.length === 0){
            return res.status(400).send('Invalid Credentials!');
        }

       const user = result.rows[0];
        // res.json({ message: 'Login successful', user });
        if(user.role === 'admin'){
            res.json({message: 'Admin login successful!',role: user.role,userData: user});
            // res.json({message: 'Admin login successful!',role: user.role});
        }
        else if(user.role === 'user'){
            res.json({message: 'User login successful!',role: user.role, userData:user});
            // res.json({message: 'User login successful!',role: user.role});
        }
        else{
            return res.status(400).send('Invalid Role!');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
});

//adding new user
app.post('/users/adduser',async (req,res) => {
    const {name,age,email,password,phone,country,role} = req.body;
    try{
        const result = await pool.query(  
            'insert into Users (name,age,email,password,phone,country,role,created_at,updated_at) values ($1,$2,$3,$4,$5,$6,$7,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) Returning *',
           [name,age,email,password,phone,country,role]
        );
        res.json(result.rows[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).send('server Error');
    }
});

//edit user
app.put('/users/edituser/:id',async (req,res) => {
    const {id} = req.params;
    const {age,email,phone,country} = req.body;
    try{
        const result = await pool.query(
            'update Users set age=$1, email=$2, phone=$3, country=$4 ,updated_at=CURRENT_TIMESTAMP where id=$5  RETURNING *',
            [age,email,phone,country,id]
        );
        console.log('Updated fields:', { age, email, phone, country });
        console.log('user Id:',id);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(result.rows[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//get user by Id
app.get('/users/getuser/:id', async (req, res) => {
    const id = parseInt(req.params.id);
 
    console.log(`Fetching user with ID: ${id}`);  
 
    try {
      const result = await pool.query('SELECT * FROM Users WHERE id=$1', [id]);
 
      if (result.rows.length === 0) {
        return res.status(404).send('User not found');
      }
 
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Server Error');
    }
  });

//delete user
app.delete('/users/deleteuser/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('delete from Users where id=$1 RETURNING *',[id]);
        res.send('User deleated successfully!');
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send('Server Error');
    }
});

//fetch profile pic
app.get('/users/getpic', async (req,res) => {
    try{
      const result = await pool.query('select * from demo');
      res.json(result.rows);
    }
    catch(error){
      console.log(error);
      res.status(500).send('Server Error');
    }
});


//upload file
 //taking file from user to store
const storage = multer.diskStorage({  //used to configure the storage of files.
    destination: (req,file,cb) => {
        cb(null, './uploads/'); //destination folder for upload image
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now() + path.extname(file.originalname)); //filename with timestamp
    },
});

const upload = multer({storage: storage});

if(!fs.existsSync('./uploads')){
   fs.mkdirSync('./uploads');
}

//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/users/upload', upload.single('profile_pic') ,async (req,res) => {
    if(!req.file){
        return res.status(400).send('No file uploaded!');
    }

    const {name,age,email,password,phone,country,role} = req.body;
    const profilePicPath = req.file ? req.file.path.replace(/\\/g,'/') : null; // Get file path from Multer  // Convert \ to /
    try{
        const result = await pool.query(  
            'insert into demo (name,age,email,password,phone,country,role,profile_pic,created_at,updated_at) values ($1,$2,$3,$4,$5,$6,$7,$8,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) Returning *',
           [name,age,email,password,phone,country,role,profilePicPath]
        );
        //res.json(result.rows[0],filePath: result.rows[0].profile_pic);
        res.json(result.rows[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).send('server Error');
    }
});

//search user by role
app.get('/users/filter', async (req, res) => {
    const { role } = req.query.role;  // Get role from query parameter
 
     
  if (!role) {
    return res.status(400).json({ message: 'Role is required' }); // If role is not provided
  }
     
  try {
    const result = await pool.query('SELECT * FROM Users WHERE role = $1', [role]);
    res.json(result.rows); // Send filtered users as response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

    // try {
    //     const result = role 
    //         ? await pool.query('SELECT * FROM Users WHERE role = $1', [role])  // Filter users by role
    //         : await pool.query('SELECT * FROM Users');  // If no role is passed, return all users

    //     res.json(result.rows);  // Return filtered users
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send('Server Error');
    // }
});


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});


// app.use('/uploads',express.static('uploads'));