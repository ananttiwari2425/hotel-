const mongoose= require('mongoose');

const personSchema = new mongoose.Schema({   ///creating schema
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        equired:true
    }
})

//schema created now create model

const Person = mongoose.model('Person',personSchema) 

module.exports=Person;