// Define a plan for a collection

const mongoose = require('mongoose');


// Schema for a collection of voters
const Voter = new mongoose.Schema({
  firstName: String,
  lastName: String,
  zipCode: Number,
  historyString: [Number]
});
