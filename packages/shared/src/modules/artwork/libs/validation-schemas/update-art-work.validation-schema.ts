import Joi from 'joi';

import { ArtWorkType } from '../enums/art-work-type.enum.js';
import {
  ArtWorkValidationMessage,
  ArtWorkValidationRule
} from '../enums/enums.js';

const updateArtWorkValidationSchema = Joi.object({
  artist: Joi.string()
    .max(ArtWorkValidationRule.ARTIST_MAX_LENGTH)
    .optional()
    .messages({
      'string.empty': ArtWorkValidationMessage.ARTIST_REQUIRED,
      'string.max': ArtWorkValidationMessage.ARTIST_MAX_LENGTH
    }),
  availability: Joi.boolean().optional().messages({
    'boolean.base': ArtWorkValidationMessage.AVAILABILITY_BOOLEAN
  }),
  image: Joi.string()
    .uri({ allowRelative: false })
    .allow('')
    .optional()
    .pattern(/\.(jpeg|jpg|png|gif|bmp|svg)$/i)
    .messages({
      'object.base': ArtWorkValidationMessage.IMAGE_URI_INVALID,
      'string.pattern.base': ArtWorkValidationMessage.IMAGE_TYPE_INVALID,
      'string.uri': ArtWorkValidationMessage.IMAGE_VALIDATION_ERROR
    }),
  price: Joi.number()
    .greater(ArtWorkValidationRule.PRICE_MIN_VALUE)
    .optional()
    .messages({
      'number.greater': ArtWorkValidationMessage.PRICE_MIN_VALUE
    }),
  title: Joi.string()
    .max(ArtWorkValidationRule.TITLE_MAX_LENGTH)
    .optional()
    .messages({
      'string.empty': ArtWorkValidationMessage.TITLE_REQUIRED,
      'string.max': ArtWorkValidationMessage.TITLE_MAX_LENGTH
    }),
  type: Joi.string()
    .valid(...Object.values(ArtWorkType))
    .optional()
    .messages({
      'any.only': ArtWorkValidationMessage.TYPE_INVALID,
      'string.empty': ArtWorkValidationMessage.TYPE_REQUIRED
    })
});

export { updateArtWorkValidationSchema };
