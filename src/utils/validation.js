const validator = require("validator");

const validateSignUpData = (req) => {
  const {
    firstName,
    lastName,
    emailId,
    age,
    gender,
    photoUrl,
    about,
    skills,
    password,
  } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditProfileData = (req) => {
  const editableDetails = ["photoUrl", "about", "skills"];
  const isEditableDetail = Object.keys(req.body).every((field) =>
    editableDetails.includes(field)
  );
  return isEditableDetail;
};
module.exports = { validateSignUpData, validateEditProfileData };
