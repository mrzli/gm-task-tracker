import { BadRequestException } from '@nestjs/common';
import { AnyAppError } from './error-unions';

export function createBadRequestException(
  data: AnyAppError
): BadRequestException {
  return new BadRequestException(data);
}
