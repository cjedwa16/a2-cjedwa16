
const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');


// we need to read the file
const fs = require('fs');
const readline= require('readline');
connect(); // To the database


const file = readline.createInterface ({
  input: fs.createReadStream('voters.csv')
});

// create an array of objects, so that each line of the file is represented by an object with 4 properties
const voterRows = [];
file.on('line', function(line)  {
  const columns = line.split(',');
  voterRows.push(new Voter({
    firstName: columns[0],
    lastName: columns[1],
    zipCode: Number(columns[2]),
    historyString: columns[3]
    })
  });
});



file.on('close', function()  {
// Reset the data
mongoose.connection.dropDatabase()
  const saves = voterRows.map(d => d.save());
  .then(() => Promise.all(saves))
  // close connection
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
});
