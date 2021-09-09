import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../../components/App';
import { wrapComponent } from './create-app-utils';
import { createAppDependencies } from './app-dependencies';
import { createInitialAppState } from '../store/base/app-state';
import { createAppAllParameters } from './app-all-parameters';
import { createAppGlobals } from './app-globals';
import { reportWebVitals } from './report-web-vitals';

export function createApp() {
  const component = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  const dependencies = createAppDependencies();
  const globals = createAppGlobals();
  const initialAppState = createInitialAppState();

  const appAllParameters = createAppAllParameters(
    dependencies,
    globals,
    initialAppState
  );

  return wrapComponent(
    component,
    appAllParameters.appContextData,
    appAllParameters.store,
    appAllParameters.theme
  );
}

export function setupApp(app) {
  ReactDOM.render(app, document.getElementById('root'));

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals(undefined);
}
