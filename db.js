const mongoose=require('mongoose')

const mongoURL='mongodb://localhost:27017/hotels';

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
   