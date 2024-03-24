const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
var express = require('express');

var router = express.Router();

router.get('/', async (req, res, next) => {  
    var msgArray = new Array;
    // try {
        await Message.find()
            .populate('sender')
            .then(messages => {
            for (msg of messages) {
                let id = msg.id;
                let subject = msg.subject;
                let msgText = msg.msgText;
                let sender = msg.sender.id;
                msgArray.push({id, subject, msgText, sender});
            }
            res.status(200).json({
                message: 'messages fetched successfully!',
                messages: msgArray
            });
        })
    // } catch(error) {
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
        console.log("MESSAGE ERROR: " + error.message);
    });
    // };
    console.log("ROUTES MESSAGES IS HERE");
});

router.post('/', async (req, res, next) => {
    try {
        const maxMessageId = await sequenceGenerator.nextId("messages");
        const message = new Message({
            id: maxMessageId, 
            subject: req.body.subject, 
            msgText: req.body.msgText, 
            sender: req.body.sender
        });

        const newMsg = await message.save();
        res.status(201).json({
            message: 'Message added successfully',
            newMessage: createdMessage
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occured creating the message',
            error: error
        });
        console.log("NEW MESSAGE ERROR IS: " + error.message);
    }
});

module.exports = router; 