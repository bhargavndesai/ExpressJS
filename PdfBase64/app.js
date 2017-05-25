const fs = require('fs');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const parseAddress = require('parse-address');
const pdffiller = require('pdffiller');
//const pdfFillForm = require('pdf-fill-form');

//creates the server
app.set('port', process.env.PORT || 3000 );
app.use(bodyparser.json());

//to handle post requests
app.post("/add" , (req, res) => {
  let jsondata = req.body;
  //console.log(jsondata.name.split(" ").slice(0,-1));
  let location = parseAddress.parseLocation(jsondata.address);
  //const shouldFlatten = false;
  //console.log(location.city);
  async function generate(){
  const source_pdf = `${__dirname}/test.pdf`;
  const dest_pdf = `${__dirname}/test_complete.pdf`;
  let data = {
    "firstName" : jsondata.name.split(" ").slice(0,-1).join(' '),
    "lastName" :  jsondata.name.split(" ").slice(-1).join(' '),
    "address1" : `${location.number} ${location.street} ${location.type}`,
    "state" : `${location.state}`,
    "city" : `${location.city}`,
    "zip" : `${location.zip}`
      }

 await pdffiller.fillFormAsync(source_pdf, dest_pdf, data, (err) => {
        if (err) console.log(err);
        console.log("we're done.");
    });

}
let test = generate();
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
