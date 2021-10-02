import { createAppReducer } from '../store/base/app-reducer';
import { configureStore } from '@reduxjs/toolkit';

export function createAppStore(dependencies) {
  return configureStore({
    reducer: createAppReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { dependencies },
        },
      }),
  });
}
