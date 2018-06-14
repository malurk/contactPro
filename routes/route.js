const express = require('express');
const  router = express.Router();

const Contact = require('../models/contacts');


//Retreiving COntacts 

router.get('/contacts', function(req,res,next){
    Contact.find(function(error, contacts){
        res.json(contacts);
    });
});


//add contacts
router.post('/contact', function(req,res,next){
    let newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });

    newContact.save(function(err,contact){
        if(err){
            res.json({msg: 'Error Adding Contact'});
        }
        else{
            res.json({msg: 'Added Contact Successfully'});
        }
    });
});


//add contacts
router.delete('/contact/:id', function(req,res,next){
    Contact.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        } else{
            res.json(result);
        }
    });
});



module.exports = router; 
