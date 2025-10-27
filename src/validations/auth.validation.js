const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
  
firstName: Joi.string().allow(null, ''),
    lastName: Joi.string().allow(null, ''),
    fullName: Joi.string().trim().allow(null, ''),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid("user", "admin"),
    callingCode: Joi.string().allow(null, ''),
    phoneNumber: Joi.number().allow(null),

    gender: Joi.string().required(),
    height: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    residentialStatus: Joi.string().allow(null, ''),
    education: Joi.string().required(),
    workExperience: Joi.string().required(),
    occupation: Joi.string().required(),
    income: Joi.object().allow(null),
    maritalStatus: Joi.string().required(),
    motherTongue: Joi.string().required(),
    religion: Joi.string().required(),
    sect: Joi.string().required(),
    caste: Joi.string().required(),
    dataOfBirth: Joi.date().allow(null),
    address: Joi.string().allow(null, ''),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    fcmToken: Joi.string(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    code: Joi.string().required(),
  }),
};

const deleteMe = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const sendOTP = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
  }),
}
const verifyOTP = {
  body: Joi.object().keys({
    phoneNumber: Joi.string().required(),
    otpCode: Joi.string().required(),
  }),
}
module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  deleteMe,
  changePassword
};
