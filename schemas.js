// schemas.js
const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().min(3),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().uri().allow(""), 
    category: Joi.string()
  }).required()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    content: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
  }).required()
});

// ✅ Proper export of both schemas
module.exports = { listingSchema, reviewSchema };
