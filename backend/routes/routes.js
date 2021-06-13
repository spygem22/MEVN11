const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// const multer = require('multer');
const passport = require("passport");

const {upload} = require('../middleware/multer');
//multer middleware
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//   callback(null, '../uploads')
// },
// filename: (req, file, callback) => {
//   const filetype = file.mimetype;
//   const fileformate = filetype.split("/")[1];
//   callback(null, Date.now() + '.' + fileformate);
// }
// });
// const upload = multer({ storage: storage }).single('avatar');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateUpdateInput = require("../validation/update");
const validateLoginInput = require("../validation/login");

// Load User model
let User = require("../model/shemaUrer");


//get all data
router.get("/data", (req, res)=>{

  User.find()
  .then(user=>res.json(user))
  .catch(err=>res.status(400).json('Erro:' + err));
});

//Get user
router.get('/:id',(req, res)=>{

  User.findById(req.params.id)
  .then(user =>res.json(user))
  .catch(err =>res.status(400).json('Error:' + err));

});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",upload,(req, res) => {

  const post = req.body;
  const avatarname = req.file.filename;
  post.avatar = avatarname;

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne(post,{ email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        fullname:req.body.fullname,
        gender:req.body.gender,   
        email: req.body.email,
        avatar: req.body.avatar,
        address: req.body.address,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json('New User Added!'))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ Email: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          _id: user._id,
          fullname: user.fullname,
          email: user.email
        };

        // Sign token
        jwt.sign(payload, keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
           (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user:user,
              msg: "You are now login."
            });
          }
        );
      } else {
        return res
          .status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  return res.json({
    user: req.user
});
});
//update user
router.put("/update/:id", (req, res) => {
  // Form validation

  const { errors, isValid } = validateUpdateInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOneAndUpdate((req.params.id))
        .then(user=>{
        user.fullname = req.body.fullname;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user. address= req.body.address;
        user.password = req.body.password;

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(user => res.json('Update Successfully!'))
            .catch(err => console.log(err));   
        });
      });
    });
});

//delete user
router.delete('/:id', (req, res)=>{

  User.findByIdAndDelete(req.params.id)
  .then(health =>res.json('Record was deleted'))
  .catch(err =>res.status(400).json('Error:' + err));

});



module.exports = router;