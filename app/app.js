// const http =  require('http');
// const myServer =  http.createServer(function (req , res) {
//   res.writeHead(200,{"Content-Type" : "text/html"});
//
//   res.write('<h1>Roux meetups<h1>');
//   res.end();
//
// });
//
// myServer.listen(3000);
// console.log('connected to the server');

const express =  require('express');
const app = express();
const dataFile = require('./data/data.json');
const reload = require('reload');

app.set('port', process.env.PORT || 3000);
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.locals.siteTitle = "Roux Meetups";
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('/home/bhargavndesai/Desktop/NodeJS/ExpressJS/app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
//var server = app.listen(app.get('port'), function () {
//  console.log('Listening to port' + app.get('port'));
//});
var server = app.listen(app.get('port'),
() => console.log('Listening to port' + app.get('port')));

reload(server, app);
