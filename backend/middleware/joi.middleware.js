// const joi = require("joi");

// const registerValidate = (req, res, next) => {
//   const registerSchema = joi.object({
//     fullName: joi.string().min(3).required().messages({
//       "string.min": "Name must be greater than 3 characters",
//       "any.required": "Name is required",
//     }),
//     phoneNumber: joi
//       .number()
//       .min(1000000000)
//       .max(9999999999)
//       .required()
//       .messages({
//         "number.min": "Phone Number must be a valid 10-digit number",
//         "number.max": "Phone Number must be a valid 10-digit number",
//         "any.required": "Phone Number is required",
//       }),
//     email: joi.string().email().required().trim.messages({
//       "string.email": "Email must be a valid email address",
//       "any.required": "Email is required",
//     }),
//     password: joi.string().min(6).required(),
//     isAdmin: joi.boolean(),
//   });
//   const { error } = registerSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: error.details?.[0]?.message || "Validation error",
//     });
//   }
//   next();
// };

// module.exports = registerValidate;

const validation = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details?.[0]?.message || "Validation error",
    });
  }
  next();
};

module.exports = validation;
