const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
var express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

router.get('/', (req, res, next) => {
    Contact.find()
    .populate('group')
    .then((contacts) => {
        res.status(200).json({
            message: 'Contacts fetched successfully!',
            contacts: contacts
        });
        // console.log("Here are your contacts from the DB: ");
        // console.log(contacts);
    })
    .catch(error  => {
        res.status(500).json({
            message: 'There was a problem retrieving contacts from the database.',
            error: error 
        });        
    });
    // console.log("MONGODB RETURNS THESE CONTACTS: " + Contact);
});

router.post('/', async (req, res, next) => {
    try {
        const maxContactId = await sequenceGenerator.nextId('contacts');
        const contact = new Contact({
            id: maxContactId, 
            name: req.body.name, 
            email: req.body.email, 
            phone: req.body.phone, 
            imageUrl: req.body.imageUrl, 
            group: req.body.group
        });
        // console.log("The new Contact ID is: " + contact.id);

        const newContact = await contact.save();
        res.status(201).json({
            message: 'Success adding new contact!',
            contact: newContact
        });
    } catch(error) {
        res.status(500).json({
            message: 'An error occured while creating the contact',
            error: error.message
        });
        console.log("NEW CONTACT ERROR MESSAGE: " + error.message);
    }

    // contact.save()
    // .then((createdContact) => {
    //     res.status(201).json({
    //         message: 'Contact added successfully',
    //         contact: createdContact
    //     });
    // })
    // .catch(error => {
    //     res.status(500).json({
    //         message: 'An error occured while creating the contact',
    //         error: error
    //     });
    // });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;
  
        Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
        res.status(204).json({
            message: 'Contact updated successfully'
        })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred while updating the contact.',
            error: error
        });
        });
    })
    .catch(error => {
    res.status(404).json({
        message: 'Contact not found.',
        error: error
    });
    });
});

router.delete('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            Contact.deleteOne({ id: req.params.id })
            .then(result => {
            res.status(204).json({
                message: 'Contact deleted successfully'
            });
            })
            .catch(error => {
                res.status(500).json({
                message: 'An error occurred trying to delete the Contact',
                error: error
            });
            })
        })
        .catch(error => {
        res.status(404).json({
            message: 'Contact not found.',
            error: error
        });
    });
});

module.exports = router; 