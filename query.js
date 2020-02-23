// Query the faculty Database

const mongoose = require('mongoose');
const connect = require('./db');  // connect the db file
const Voter = require('./schema');

connect(); // To the database


const queries = [

// How many registered voters live in the Canton zip code (13617)?
Voter.find().where('zipCode').equals('13617').count(),

// What are the full names of all the registered voters whose first-name is STARR?
Voter.find().where('firstName').equals('STARR'),

// How many people voted in the 2016 general election (GE16)?
Voter.find().where('historyString').in('GE16').count(),

// What is the last-name that comes last in the county in alphabetical order?
Voter.find().sort('-lastName').limit(1),

// How many zip codes does the county contain?
Voter.distinct('zipCode')

];

// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('The number of registered voters that live in zip code 13617: ', results[0]);
    console.log('The full names of all of the registered voters whose first-name is STARR: ', results[1].map(v => v.firstName + ' ' + v.lastName));
    console.log('Number of people who voted in the GE 2016: ', results[2]);
    console.log('The last-name that comes in last in the county in alphabetical order:  ', results[3].map(v => v.lastName));
    console.log('The number of zip codes that the county contains: ', results[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
