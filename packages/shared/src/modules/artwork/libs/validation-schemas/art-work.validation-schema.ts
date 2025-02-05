import Joi from 'joi';

import { ArtWorkType } from '../enums/art-work-type.enum.js';
import {
  ArtWorkValidationMessage,
  ArtWorkValidationRule
} from '../enums/enums.js';

const artWorkValidationSchema = Joi.object({
  artist: Joi.string()
    .max(ArtWorkValidationRule.ARTIST_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': ArtWorkValidationMessage.ARTIST_REQUIRED,
      'string.max': ArtWorkValidationMessage.ARTIST_MAX_LENGTH
    }),
  availability: Joi.boolean().optional().messages({
    'boolean.base': ArtWorkValidationMessage.AVAILABILITY_BOOLEAN
  }),
  price: Joi.number()
    .greater(ArtWorkValidationRule.PRICE_MIN_VALUE)
    .required()
    .messages({
      'number.greater': ArtWorkValidationMessage.PRICE_MIN_VALUE
    }),
  title: Joi.string()
    .max(ArtWorkValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': ArtWorkValidationMessage.TITLE_REQUIRED,
      'string.max': ArtWorkValidationMessage.TITLE_MAX_LENGTH
    }),
  type: Joi.string()
    .valid(...Object.values(ArtWorkType))
    .required()
    .messages({
      'any.only': ArtWorkValidationMessage.TYPE_INVALID,
      'string.empty': ArtWorkValidationMessage.TYPE_REQUIRED
    })
});

export { artWorkValidationSchema };
