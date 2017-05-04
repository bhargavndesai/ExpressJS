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
  db.serialize(() => {
    let stmt = db.prepare(`INSERT INTO user_info (name, email, number, password) VALUES (?,?,?,?)`);
  for(var i = 0;i<jsondata.length;i++){
      stmt.run(jsondata[i].name, jsondata[i].email,jsondata[i].number,jsondata[i].password);
    }
stmt.finalize();
  });
  db.close();
  res.end("update complete");
  });

//to handle delete requests
app.delete('/delete' , (req, res) => {
  let db = new sqlite3.Database('../../userInfo1');
  let data = req.body;
  db.serialize(() => {
    let stmt = db.prepare(`DELETE FROM user_info WHERE id = ?`);
    stmt.run(data.id);
    stmt.finalize();
  });
  db.close();
  res.end("delete complete");
});

//to handle get request
app.get('/', (req,res) => {
  let db = new sqlite3.Database('../../userInfo1');
  let output = [];
  db.serialize(() => {
    db.all("SELECT * FROM user_info",(err , row) => {
    res.end(JSON.stringify(row));
    // res.end(`id: ${row.id}, name: ${row.name}, eamil: ${row.email}, number: ${row.number}, password: ${row.password}`);
  });
  });
  db.close();
});

let server = app.listen(app.get('port'), () => {
  console.log(`listening to port : ${app.get('port')}`);
});

// function dbUpdate(value){
//
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS user_info(
//     id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
//     name VARCHAR(20),
//     email VARCHAR(20),
//     number INTEGER,
//     password VARCHAR(20))`
//   );
//
//
//   //fs.readFile('./testdata.json', 'utf8' ,(err,data) => {
//   //console.log(value.name, value.email,value.number,value.password);
//   let stmt = db.prepare(`INSERT INTO user_info (name, email, number, password) VALUES (?,?,?,?)`);
//   stmt.run(value.name, value.email,value.number,value.password);
//   stmt.finalize();
//   console.log("inside update");
//
//
//   //db.each("SELECT * FROM user_info",(err , row) => {
//     // console.log(`${row.id} : ${row.name} : ${row.email} : ${row.number} : ${row.password}`);
//     //console.log('******************', row, '111111', err);
//   //});
// db.close();
// });
//
//
// }

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('../../userInfo1');
//
// db.serialize(function() {
//   // db.run("CREATE TABLE lorem (info TEXT)");
//   //
//   var stmt = db.prepare("INSERT INTO user_info (name, email, number, password) VALUES (?,?,?,?)");
//   // for (var i = 0; i < 10; i++) {
//       stmt.run('My name ', 'some@example.com', Math.round(Math.random() * 1000),'asdas');
//   // }
//   stmt.finalize();
//
//   db.each("SELECT * FROM user_info", function(err, row) {
//       console.log(`${row.id} : ${row.name} : ${row.email} : ${row.number} : ${row.password}`);
//       // console.log('bhargav i mad--------------------------------------', row, '+++++', err);
//   });
// });
//
// db.close();
