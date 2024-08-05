const express=require('express');
const router=express.Router();
const Person=require('./../models/person')



router.post('/',async (req,res)=>{
    try{
    const data = req.body   //assuming person data is stored in body of req
  
    const newPerson= new Person(data);
  
    const response = await newPerson.save();
    console.log('data saved')
    res.status(200).json(response);
  
  
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })


router.get('/',async(req,res)=>{
    try{
      const data=await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })

router.get('/:workType',async(req,res)=>{
    try{
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response=await Person.find({work:workType});
        console.log('response fetched');
        res.status(200).json({response})
      }else{
        res.status(404).json({error:'Invalid work type'})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server Error'})
    }
  })

  router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const toUpdate=req.body;

        const response=await Person.findByIdAndUpdate(personId,toUpdate,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
      res.status(500).json({error:'Internal server Error'})
    }
  })


  //Passport.js is very famous middleware authetication in nodejs

  router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId)

        if(!response)
        {
            console.log('data not found');
        res.status(404).json('person not found')
        }

        console.log('data deleted');
        res.status(200).json({message:'person deleted'})

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'})
    }
  })
// New comment added
  module.exports=router;