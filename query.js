// Query the faculty Database

const mongoose = require('mongoose');
const connect = require('./db');  // connect the db file
const Voter = require('./schema');

connect(); // To the database


const queries = [

// How many registered voters live in the Canton zip code (13617)?
Voter.find().where('zipCode').equals(13617)

// What are the full names of all the registered voters whose first-name is STARR?
Voter.find().where('firstName').equals('STARR'),

// How many people voted in the 2016 general election (GE16)?
Voter.find().where('started').equals(2003),

// Who teaches 362?
Voter.find().sort('-lastName').limit(1),

// How many zip codes does the county contain?
Voter.distinct('zipCode')

];


// Run the queries in parallel
Promise.all(queries)
  .then(function(results) {
    console.log('Number of registered voters that live in zip code 13617 ', results[0].map(p => p.firstName));
    console.log('The full names of all of the registered voters whose first name is STARR: ', results[1].map(p => p.firstName + p.lastName));
    console.log('Number of people who voted in the GE 2016: ', results[2].map(p => p.name));
    console.log('last-name that comes in last in the county in alphabetical order:  ', results[3].map(p => p.lastName));
    console.log('Number of zip codes that the county contains: ', results[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
