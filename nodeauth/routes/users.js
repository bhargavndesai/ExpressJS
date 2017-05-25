const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({dest: './uploads'});
const User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) =>  {
  res.render('register',{title:'Register'});
});

router.post('/register', upload.single('profileimage'), (req, res, next) =>  {
let name = req.body.name;
let email = req.body.email;
let password = req.body.password;
let password2 = req.body.password2;
let username = req.body.username;

if (req.file) {
  console.log('Uploading file....');
  let profileimage = req.file.filename;

}else {
  console.log('No file uploaded');
  let profileimage = 'noimage.jpg';
}

//form Validator
req.checkBody('name', 'Name field cannot be empty').notEmpty();
req.checkBody('email', 'email field cannot be empty').notEmpty();
req.checkBody('email', 'Email is not valid').isEmail();
req.checkBody('username', 'Username field cannot be empty').notEmpty();
req.checkBody('password', 'Password field cannot be empty').notEmpty();
req.checkBody('password2', 'Password do not match').equals(req.body.password);

//To check the errors
let errors = req.validationErrors();
if(errors){
  res.render('register', {
    errors: errors
  });
}else{
  let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });

    User.createUser(newUser, (err, user) => {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can login');

    res.location('/');
    res.redirect('/');
}

});

router.get('/login', (req, res, next) => {
  res.render('login', {title:'Login'});

  });

module.exports = router;
