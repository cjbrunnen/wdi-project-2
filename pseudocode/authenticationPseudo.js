// app.js:
//
// const express     = require('express');
// const morgan      = require('morgan');
// const bodyParser  = require('body-parser');
// const cors        = require('cors');
// const mongoose    = require('mongoose');
//
// const app         = express();
// const config      = require('./config/config');
// const router      = require('./config/routes');
//
// mongoose.connect(config.db);
//
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use('/api', router);
//
//
// app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
// -------------------------------------------------------------------------------
// model / user.js:
//
// const mongoose = require("mongoose");
// const bcrypt   = require('bcrypt');
//
// const userSchema = new mongoose.Schema({
//   username:     { type: String, unique: true, required: true },
//   email:        { type: String, unique: true, required: true },
//   passwordHash: { type: String, required: true }
// });
//
// userSchema
//   .virtual('password')
//   .set(setPassword);
//
// userSchema
//   .virtual("passwordConfirmation")
//   .set(setPasswordConfirmation);
//
// userSchema
//   .path("passwordHash")
//   .validate(validatePasswordHash);
//
// userSchema.methods.validatePassword = validatePassword;
//
// //change the output that the Schema has. you don't need to memorize this part - just keep it handy. this is a BLACKLIST
// userSchema.set('toJSON', {
//   transform: function(doc, ret) {
//     delete ret.passwordHash;
//     delete ret.__v;
//     return ret;
//   }
// });
//
// module.exports = mongoose.model("User", userSchema);
//
// function setPassword(value){
//   this._password    = value;
//   this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
// }
//
// function setPasswordConfirmation(passwordConfirmation) {
//   this._passwordConfirmation = passwordConfirmation;
// }
//
// function validatePasswordHash() {
//   if (this.isNew) {
//     if (!this._password) {
//       return this.invalidate("password", "A password is required.");
//     }
//
//     if (this._password !== this._passwordConfirmation) {
//       return this.invalidate("passwordConfirmation", "Passwords do not match.");
//     }
//   }
// }
//
// function validatePassword(password){
//   return bcrypt.compareSync(password, this.passwordHash);
// }
// --------------------------------------------------------------------------------
// controller / authentication.js:
//
// //create two routes. one for register and one for log in
// module.exports = {
//   register: authenticationsRegister,
//   login:    authenticationsLogin
// };
//
//
// const User = require('../models/user');
// //req stands for the http: address. request/response
// function authenticationsRegister(req, res) {
//   User.create(req.body.user, (err, user) => {
//     if (err) return res.status(500).json({ message: 'something went wrong' });
//     return res.status(201).json({
//       message: `Welcome ${user.username}!`,
//       user
//     });
//   });
// }
//
// function authenticationsLogin(req, res) {
//   User.findOne({ email: req.body.email }, (err, user) => {
//     if (err) return res.status(500).json({ message: 'something went wrong' });
//     if (!user || !user.validatePassword(req.body.password)) {
//       return res.status(401).json({ message: 'Unauthorised' });
//     }
//     return res.status(200).json({
//       message: `Welcome back ${user.username}!`,
//       user
//     });
//   });
// }
// -------------------------------------------------------------------------------
// config / config.js:
//
// module.exports = {
//   port: process.env.PORT || 3000,
//   'db': 'mongodb://localhost/encrypting-passwords-with-bcrypt-and-mongoose'
// };
// -----------------------------------------------------------------------------
// config / routes.js
//
// const express = require('express');
// const router  = express.Router();
//
// const authentications = require('../controllers/authentications.js');
//
// router.route('/register')
//   .post(authentications.register);
// router.route('/login')
//   .post(authentications.login);
//
// // from drones //
// router.route("/drones")
//   .get(drones.index)
//   .post(drones.create);
// router.route("/drones/:id")
//   .get(drones.show)
//   .put(drones.update)
//   .delete(drones.delete);
//
//
// module.exports = router;
// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
