// Define a plan for a collection

const mongoose = require('mongoose');


// Schema for a collection of voters
const Voter = new mongoose.Schema({
  firstName: String,
  lastName: String,
  zipCode: Number,
  historyString: [Number]
});


// Speed up queries on all fields
Voter.index({firstName: 1});   // I want to be able to look up professors by their name and quicly
Voter.index({lastName: 1});
Voter.index({zipCode: 1});
Voter.index({historyString: 1});

// Compile and export this Schema
module.exports = mongoose.model('Voter', Voter);
