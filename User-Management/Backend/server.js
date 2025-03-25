const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//import pool from './db.js';
const { Pool } = require('pg');

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

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});