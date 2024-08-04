const express = require('express')
const app = express()
const db=require('./db')
require('dotenv').config();


const bodyParser = require('body-parser')
app.use(bodyParser.json()); 

app.get('/', function (req, res) {
  res.send('Hello World')
})
  //req.body
  const personRoutes=require('./routes/personRoutes');
  app.use('/person',personRoutes);

  const port=process.env.PORT;
app.listen(port,()=>{
  console.log('Hello World 3000');
})