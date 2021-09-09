import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { createAppEpic } from '../store/base/app-epic';
import { createAppReducer } from '../store/base/app-reducer';

export function createAppStore(dependencies, initialAppState) {
  const appReducer = combineReducers(createAppReducer());
  const { enhancer, epicMiddleware } = createStoreEnhancer(dependencies);

  const store = createStore(appReducer, initialAppState, enhancer);

  const appEpic = createAppEpic();
  epicMiddleware.run(appEpic);

  return store;
}

function createStoreEnhancer(dependencies) {
  const reduxObservableMiddleware = createEpicMiddleware({ dependencies });

  const composeEnhancers = composeWithDevTools({});
  const storeEnhancer = applyMiddleware(reduxObservableMiddleware);

  return {
    enhancer: composeEnhancers(storeEnhancer),
    epicMiddleware: reduxObservableMiddleware,
  };
}
