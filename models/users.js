'use strict';
/**
*Module dependencies
*/
//-----------------------------------------------------------------------------
var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');
//=============================================================================
/**
*User schema
*/
//-----------------------------------------------------------------------------
var UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
      },
    firstName: {
      type: String,
      required: true
      },
    lastName: {
      type: String,
      required: true
      },
    email: {
      type: String,
      unique: true,
      required: true
      },
    password: {
      type: String,
      required: true
    }
  });
//=============================================================================
/**
*Create schema methods
*/
//-----------------------------------------------------------------------------
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//=============================================================================
/**
*Declare Schema plugins
*/
//-----------------------------------------------------------------------------
/*UserSchema.plugin(mongoosePaginate);
we'll include pagination after everything works ok*/
//UserSchema.plugin(autopopulate);
//=============================================================================
/**
*Create user model
*/
//-----------------------------------------------------------------------------
var UserModel = mongoose.model('User', UserSchema);
//==============================================================================
/**
*Export user model
*/
//-----------------------------------------------------------------------------
module.exports = UserModel;
//==============================================================================
