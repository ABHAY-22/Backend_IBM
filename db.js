const mongoose=require('mongoose');

const connection=mongoose.connect(`mongodb+srv://abhayera2013:Abhay123@cluster0.gdyvizs.mongodb.net/IBM`)


const userschema=mongoose.Schema({
email:{type : String},
 password : {type : String},
 confirmPassword : {type : String},

})

const employeesschema=mongoose.Schema({
firstName : {type : String},
lastName : {type : String},
email : {type : String},
salary : {type : Number},
date : {type : String},

})


const usermodule=mongoose.model("userdata" , userschema);

const employemodule=mongoose.model("employeedata" , employeesschema);

module.exports={connection, usermodule, employemodule};





