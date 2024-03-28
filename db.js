const mongoose=require('mongoose');

const connection=mongoose.connect(`mongodb+srv://abhayera2013:Abhay123@cluster0.gdyvizs.mongodb.net/IBM`)


const userschema=mongoose.Schema({
email:{type : String},
 password : {type : String},
 ConfirmPassword : {type : String},

})

const employeesschema=mongoose.Schema({
FirstName : {type : String},
LastName : {type : String},
Email : {type : String},
Department:{type:String},
Salary : {type : Number},
date : {type : String},

})


const usermodule=mongoose.model("userdata" , userschema);

const employemodule=mongoose.model("employeedata" , employeesschema);

module.exports={connection, usermodule, employemodule};





