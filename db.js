const mongoose=require('mongoose')
require('dotenv').config();

//const mongoURL='mongodb://localhost:27017/hotels';
//const mongoURL=process.env.MONGODB_URL_LOCAL;

const mongoURL=process.env.MONGODB_URL

mongoose.connect(mongoURL,{
    
})

const db=mongoose.connection;

db.on('connected', () => {
    console.log('someone connected!');
  });

  db.on('Erro', (err) => {
    console.log('some Error found!');
  });

  db.on('disconnected', () => {
    console.log('someone disconnected!');
  });

  module.export=db;
   