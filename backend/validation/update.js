const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = "Name field is required";
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  //phone checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Name field is required";
  }

 
  return {
    errors,
    isValid: isEmpty(errors)
  };
};