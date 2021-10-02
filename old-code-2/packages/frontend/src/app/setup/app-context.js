import React from 'react';
import { createAppDependencies } from './app-dependencies';
import { createAppGlobals } from './app-globals';

export function createAppContextData(dependencies, globals) {
  return {
    dependencies,
    globals,
  };
}

const defaultAppContextData = createAppContextData(
  createAppDependencies(),
  createAppGlobals()
);

export const AppContext = React.createContext(defaultAppContextData);
