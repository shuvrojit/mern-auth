import { body } from "express-validator";

const userValidation = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be string"),
  body("userName")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("username must be string"),
  body("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Email is not valid email address"),
  body("password")
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least six characters long"),
];

export default userValidation;
