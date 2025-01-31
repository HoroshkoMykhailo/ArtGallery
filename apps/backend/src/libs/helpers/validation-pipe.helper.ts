import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

import { type ValidationSchema } from '../validation-schemas/validation-schemas.js';

@Injectable()
class JoiValidationPipe<T> implements PipeTransform<T> {
  public constructor(private readonly schema: ValidationSchema<T>) {}

  public transform(value: T, metadata: ArgumentMetadata): T {
    if (metadata.type !== 'body') {
      return value;
    }

    const result = this.schema.validate(value, { abortEarly: false });

    if (result.error) {
      throw new BadRequestException(
        result.error.details.map(d => d.message).join(', ')
      );
    }

    return result.value;
  }
}

export { JoiValidationPipe };
