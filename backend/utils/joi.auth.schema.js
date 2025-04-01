const joi = require("joi");

const registerSchema = joi
  .object({
    fullName: joi.string().min(3).required().messages({
      "string.min": "Name must be greater than 3 characters",
      "any.required": "Name is required",
    }),
    phoneNumber: joi
      .number()
      .min(1000000000)
      .max(9999999999)
      .required()
      .messages({
        "number.min": "Phone Number must be a valid 10-digit number",
        "number.max": "Phone Number must be a valid 10-digit number",
        "any.required": "Phone Number is required",
      }),
    email: joi.string().email().required().trim().messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: joi.string().min(6).required(),
    isAdmin: joi.boolean().optional(),
  })
  .unknown(true);

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const addressSchema = joi.object({
  locality: joi.string().min(4).required(),
  pinCode: joi.number().min(100000).max(999999).required(),
  city: joi.string().min(4).required(),
  state: joi.string().min(4).required(),
  landmark: joi.string().min(4).required(),
  phoneNumber: joi.number().min(1000000000).max(9999999999).required(),
});

module.exports = { registerSchema, loginSchema, addressSchema };
