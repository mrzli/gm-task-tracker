import { createVolatileDateTimeApi } from '@mrzli/gm-js-libraries-utilities/date';

export interface DateTimeUtils {
  readonly millisecondsSinceEpoch: () => number;
}

export function createDateTimeUtils(): DateTimeUtils {
  const volatileDateTimeApi = createVolatileDateTimeApi();
  return {
    millisecondsSinceEpoch: () => volatileDateTimeApi.millisecondsSinceEpoch(),
  };
}
