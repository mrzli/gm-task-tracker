import { ReportHandler } from 'web-vitals/src/types';
import { emptyFn } from '@mrzli/gm-js-libraries-utilities/function';

export function reportWebVitals(onPerfEntry: ReportHandler | undefined): void {
  if (onPerfEntry) {
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .finally(emptyFn);
  }
}
