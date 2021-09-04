import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodTypeAny } from 'zod/lib/types';
import { createBadRequestException } from '../utils/errors/error-factories';
import { AppErrorType } from '../utils/errors/enums/app-error-type';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  public constructor(private readonly schema: ZodTypeAny) {}

  public async transform(
    value: unknown,
    _metadata: ArgumentMetadata
  ): Promise<unknown> {
    const result = await this.schema.safeParseAsync(value);
    if (result.success) {
      return result.data;
    } else {
      throw createBadRequestException({
        appErrorType: AppErrorType.Validation,
        zodIssues: result.error.issues,
      });
    }
  }
}
