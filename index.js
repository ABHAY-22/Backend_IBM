const express = require('express');
const app = express();
app.use(express.json());

const cors=require("cors")

app.use(cors());

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { usermodule, employemodule, connection } = require('./db');



app.get("/", async (req, res) => {
    try {
        const data = await employemodule.find();
        res.send(data);
        console.log('Data received');
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error'); 
    }
});

app.post('/employee', async (req, res) => {
    try {
        const data = await employemodule.create(req.body);
        res.send(data);
        console.log('Data created');
    } catch (error) {
        console.log('Error from post function:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/employee/:id', async (req, res) => {
    try {
        const data = req.body;
        const update = await employemodule.findById(req.params.id);
        update.FirstName = data.FirstName || update.FirstName;
        update.LastName = data.LastName || update.LastName;
        update.Email = data.Email || update.Email;
        update.Salary = data.Salary || update.Salary;
        update.date = data.date || update.date;
        const updatedData = await update.save();
        res.status(200).send(updatedData); // 200: OK
        console.log('Data updated');
    } catch (error) {
        console.log('Error from put function:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/employee/:id', async (req, res) => {
    try {
        const data = await employemodule.findByIdAndDelete(req.params.id);
        res.status(200).send(data);
        console.log('Data deleted');
    } catch (error) {
        console.log('Error from delete function:', error);
        res.status(500).send('Internal Server Error'); 
    }
});


app.post("/signup", async (req, res) => {
    const { email, password, ConfirmPassword } = req.body;
    try {
        if (!email || !password || !ConfirmPassword) {
            res.send('All fields required'); 
        }
        const existingUser = await usermodule.find({ email: email });
        if (existingUser.length !== 0) {
            res.send('Email Already Exists'); 
        } else {
            const hash = await bcrypt.hash(password, 6);
            await usermodule.create({ email: email, password: hash, ConfirmPassword: ConfirmPassword });
            res.status(201).send({ email: email, password: password }); 
            console.log('User created');
        }
    } catch (error) {
        console.log('Error from signup function:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usermodule.findOne({ email: email });
        if (!user) {
            res.status(404).send('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).send('Invalid password'); 
        }
        const token = jwt.sign({ userId: user._id }, "abhay");
        res.cookie('token', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        });
        res.status(200).send({ message: 'User Found', token: token }); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error'); 
    }
});


const port = 3000;
app.listen(port, () => {
    console.log("Server is running on port", port);
});
