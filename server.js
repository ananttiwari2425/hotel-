const express = require('express')
const app = express()
const db=require('./db')
require('dotenv').config();
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person')


const bodyParser = require('body-parser')
app.use(bodyParser.json()); 

//Middleware function1
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}] Request made to : ${req.originalUrl}`);
  next();
}

//Middleware function2
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(logRequest);
app.use(myLogger);


passport.use(new LocalStrategy(async(USERNAME,Password,done) =>{
  //authentication logic here
  try{
    console.log(USERNAME,Password);
    const user=await Person.findOne({username:USERNAME});
    if(!user){
      return done(null,false,{message:'Incorrect Username'})
    }
    
    const isPasswordMatch = user.password === Password ?true :false;
    if(isPasswordMatch)
    {
      return done(null,user);
    }
    else{
      return done(null,false,{message:'Incorrect password'})
    }
  }catch(err){
    return done(err);
  }
} ))

app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',function (req, res) {
  res.send('Hello World')
})
  //req.body
  const personRoutes=require('./routes/personRoutes');
  app.use('/person',localAuthMiddleware,personRoutes);

  const port=process.env.PORT;
app.listen(port,()=>{
  console.log('Hello World 3000');
})