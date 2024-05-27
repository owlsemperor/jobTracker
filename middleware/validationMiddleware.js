import { body, param, validationResult } from 'express-validator' // EXPRESS VALIDATOR
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js'
import { JOB_TYPE, JOB_STATUS } from '../utils/constants.js'
import mongoose from 'mongoose'
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route')
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company is required...'),
  body('position').notEmpty().withMessage('Position is required...'),
  body('jobLocation').notEmpty().withMessage('Job Location is required...'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Inavlid Status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Inavlid Type value'),
])

export const validateIdParams = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value)
    if (!isValid) throw new BadRequestError('invalid MongoDB id')
    const job = await Job.findById(value)
    if (!job) throw new NotFoundError(`no job with id ${value}`)

    //
    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === job.createdBy.toString()
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError('not authorized to access this route')
    }
  }),
])

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('A user with this email already exist')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be 8 character long'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password').notEmpty().withMessage('password is required'),
])

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('A user with this email already exist')
      }
    }),

  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
])
