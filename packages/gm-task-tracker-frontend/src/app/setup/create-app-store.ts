import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { EmptyObject } from '@mrzli/gm-js-libraries-utilities/types';
import { createAppEpic } from '../store/base/app-epic';
import { AppState } from '../store/base/app-state';
import { AppDependencies } from './app-dependencies';
import { createAppReducer } from '../store/base/app-reducer';
import { AppAction } from '../store/base/app-action';

export function createAppStore(
  dependencies: AppDependencies,
  initialAppState: AppState
): Store<AppState, AppAction> {
  const appReducer: Reducer<AppState, AppAction> = combineReducers<AppState>(
    createAppReducer()
  );
  const { enhancer, epicMiddleware } = createStoreEnhancer(dependencies);

  const store = createStore<AppState, AppAction, EmptyObject, EmptyObject>(
    appReducer,
    initialAppState,
    enhancer
  );

  const appEpic = createAppEpic();
  epicMiddleware.run(appEpic);

  return store;
}

interface CreateEnhancerReturnValue {
  readonly enhancer: StoreEnhancer<EmptyObject, EmptyObject>;
  readonly epicMiddleware: EpicMiddleware<
    AppAction,
    AppAction,
    AppState,
    AppDependencies
  >;
}

type StoreEnhancerFn = (
  next: StoreEnhancerStoreCreator
) => StoreEnhancerStoreCreator<{ dispatch: unknown }>;
type ComposeFn = <R>(
  func: StoreEnhancerFn
) => (...args: readonly unknown[]) => R;

function createStoreEnhancer(
  dependencies: AppDependencies
): CreateEnhancerReturnValue {
  const reduxObservableMiddleware = createEpicMiddleware<
    AppAction,
    AppAction,
    AppState,
    AppDependencies
  >({ dependencies });

  const composeEnhancers: ComposeFn = composeWithDevTools({});
  const storeEnhancer: StoreEnhancerFn = applyMiddleware(
    reduxObservableMiddleware
  );

  return {
    enhancer: composeEnhancers(storeEnhancer),
    epicMiddleware: reduxObservableMiddleware,
  };
}
