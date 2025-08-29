const { Joi } = require('celebrate')

const MIN_PASSWORD_LENGTH = 6
const ID_LENGTH = 24
const ALLOWED_ORDER_STATUS = ['pending', 'shipped', 'in transit', 'delivered']

const schema = {
  auth: {
    login: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    register: Joi.object().keys({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(MIN_PASSWORD_LENGTH).required(),
    }),
  },
  user: {
    query: Joi.object().keys({
      new: Joi.boolean(),
    }),
    update: Joi.object().keys({
      fullname: Joi.string(),
      currentPassword: Joi.string(),
      newPassword: Joi.string().min(MIN_PASSWORD_LENGTH),
    }).with('newPassword', 'currentPassword'),
  },
  product: {
    query: Joi.object().keys({
      new: Joi.boolean(),
      category: Joi.string()
    }),
    new: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().uri().required(),
      price: Joi.number().positive().required(),
      inStock: Joi.boolean(),
      categories: Joi.array().items(Joi.string()).single(),
      sizes: Joi.array().items(Joi.string()).single(),
      colors: Joi.array().items(Joi.string()).single(),
    }),
    update: Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      image: Joi.string().uri(),
      price: Joi.number().positive(),
      inStock: Joi.boolean(),
      categories: Joi.array().items(Joi.string()).single(),
      sizes: Joi.array().items(Joi.string()).single(),
      colors: Joi.array().items(Joi.string()).single(),
    }),
  },
  order: {
    query: Joi.object().keys({
      status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
    }),
    new: Joi.object().keys({
      products: Joi.array().items(
        Joi.object({
          productId: Joi.string().length(ID_LENGTH).required(),
          quantity: Joi.number().integer().min(1).required()
        })
      ).min(1).required(),
      amount: Joi.number().positive().required(),
      address: Joi.object({
        line1: Joi.string().required(),
        line2: Joi.string().allow(''),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postal_code: Joi.string().required(),
        country: Joi.string().required()
      }).required()
    })
  }
}

module.exports = schema
