import { ArtWorkValidationRule } from '../enums/art-work-validation-rule.enum.js';

const ArtWorkValidationMessage = {
  ARTIST_MAX_LENGTH: `Artist name must be at most ${ArtWorkValidationRule.ARTIST_MAX_LENGTH} characters long`,
  ARTIST_REQUIRED: 'Artist is required',
  AVAILABILITY_BOOLEAN: 'Availability must be a boolean',
  IMAGE_TYPE_INVALID: 'Image URL is not an image file',
  IMAGE_URI_INVALID: 'Image URL is invalid',
  IMAGE_VALIDATION_ERROR: 'Image must be a valid object',
  PRICE_MIN_VALUE: `Price must be greater than ${ArtWorkValidationRule.PRICE_MIN_VALUE}`,
  TITLE_MAX_LENGTH: `Title must be at most ${ArtWorkValidationRule.TITLE_MAX_LENGTH} characters long`,
  TITLE_REQUIRED: 'Title is required',
  TYPE_INVALID: 'Type is invalid',
  TYPE_REQUIRED: 'Type is required'
} as const;

export { ArtWorkValidationMessage };
