import React from 'react';
import { AppDependencies, createAppDependencies } from './app-dependencies';
import { AppGlobals, createAppGlobals } from './app-globals';

export interface AppContextData {
  readonly dependencies: AppDependencies;
  readonly globals: AppGlobals;
}

export function createAppContextData(
  dependencies: AppDependencies,
  globals: AppGlobals
): AppContextData {
  return {
    dependencies,
    globals,
  };
}

const defaultAppContextData = createAppContextData(
  createAppDependencies(),
  createAppGlobals()
);

export const AppContext: React.Context<AppContextData> =
  React.createContext<AppContextData>(defaultAppContextData);
