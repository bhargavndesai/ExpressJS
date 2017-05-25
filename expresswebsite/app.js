const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req,res) => {
   res.render('index', {title: 'Computer not working?'});
});

app.get('/about', (req,res) => {
   res.render('about');
});

app.get('/contact', (req,res) => {
   res.render('contact');
});

app.post('/contact/send', (req,res) => {
   let transporter = nodemailer.createTransport({
     service: 'Gmail',
     auth: {
       user: 'youremail@gmail.com',
       pass: ''
     }
   });
   let mailOptions = {
     from: 'John Doe <youremail@gmail.com>',
     to: 'xyz@abc.com',
     subject: 'Website Submission',
     text: `You have a submission with the following detatils .....
            Name:${req.body.name},Email: ${req.body.email},Message:${req.body.message}`,
     html: `<p>You have a submission with the following details...</p><ul><li>Name:
     ${req.body.name}</li><li>Email: ${req.body.email}</li><li>Message: ${req.body.message}</li></ul>`
   }
   transporter.sendMail(mailOptions, (err , info) => {
     if(err){
       console.log(err);
       res.redirect('/');
     }else {
       console.log('Message sent');
       res.redirect('/');
     }
   });
});

let server = app.listen(app.get('port'), () => {
  console.log(`Server running at: ${app.get('port')}`);
})
