const Sequence = require('../models/sequence');
var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

// Aaron's workaround
const sequenceGenerator = {   //First, I restructured sequenceGenerator to be a variable containing the various methods.

     async init() {    //Make this init() function asynchronous
          try {
               const sequence = await Sequence.findOne({}).exec();   
               if (!sequence) {
                    throw new Error('Sequence not found');
               }
               this.sequenceId = sequence._id;
               this.maxDocumentId = sequence.maxDocumentId;
               this.maxMessageId = sequence.maxMessageId;
               this.maxContactId = sequence.maxContactId;
               } catch (err) {
                    console.error('Error initializing SequenceGenerator:', err);
                    throw err;
               }
          },

     async nextId(collectionType) {
          // console.log("The CollectionType is: " + collectionType);
          // Ensure the generator is initialized. If not, call the init() function above. 
          if (!this.sequenceId) {
               await this.init();
          }
          let updateObject = {};
          let nextId;
     
          // try {
             switch (collectionType.toLowerCase()) {
               case 'documents':
                    // console.log("Current MaxDocID: " + maxDocumentId);
                    this.maxDocumentId++;
                    // console.log("New MaxDocID: " + maxDocumentId);
                 updateObject = { maxDocumentId: this.maxDocumentId };
                 nextId = this.maxDocumentId;
                 break;
               case 'messages':
                    // console.log("Current maxMessageId: " + maxMessageId);
                    this.maxMessageId++;
                    // console.log("New maxMessageId: " + maxMessageId);
                    updateObject = { maxMessageId: this.maxMessageId };
                    nextId = this.maxMessageId;
                 break;
               case 'contacts':
                    // console.log("Current maxContactId: " + maxContactId);
                    this.maxContactId++;
                    // console.log("Current maxContactId: " + maxContactId);
                    updateObject = { maxContactId: this.maxContactId };
                    nextId = this.maxContactId;
                 break;
               default:
               //   return -1;
                throw new Error('Not a valid collection type');
          }
          try {
               await Sequence.updateOne({_id: sequenceId}, {$set: updateObject}).exec();
               return nextId;
     //      }
     // // }     
   
     // // try {
     } catch (error) {
      console.log("THE SEQUENCE GENERATOR ERROR: " + error);
      throw error;
     // return null;
     }
}  //Close out the sequenceGenerator object.
}

module.exports = sequenceGenerator;