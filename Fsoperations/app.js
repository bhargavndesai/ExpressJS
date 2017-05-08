const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

//creates the server
app.set('port', process.env.PORT || 3000 );
app.use(bodyparser.json());

//to handle post requests
app.post("/add" , (req, res) => {
  let db = new sqlite3.Database('../../userInfo1');
  let jsondata = req.body;
  let counter = 0;
  let getdataValue = '';

  jsondata.forEach((item) => {
    getdataValue += JSON.stringify(item)+"\n";
    counter++;
//The below line of code also works but is a bad way to code as file writing will be called againa dna gain in loop
    //fs.writeFileSync(`${__dirname}/data.json`, getdataValue, 'utf8');
    // fs.writeFile(`${__dirname}/data.json`,getdataValue, (err) => {
    //    if(err){
    //      return console.log(err);
    //    }
    //  });
});
if(counter == jsondata.length){
  fs.writeFile(`${__dirname}/data.json`,getdataValue, (err) => {
     if(err){
       return console.log(err);
     }
   });
  }
  res.end(`done writing`);

});
//to handle get request
app.get('/', (req,res) => {
  fs.readFile(`${__dirname}/testdata.json`,'UTF8', (err, contents) => {
    if(err){
      console.log(err);
    }
    res.end(JSON.stringify(JSON.parse(contents)));
//console.log();
  });


});

let server = app.listen(app.get('port'), () => {
  console.log(`listening to port : ${app.get('port')}`);
});
