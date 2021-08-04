import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { AppState } from '../store/base/app-state';
import { ExampleState } from '../store/example/example-state';
import { useSelector } from 'react-redux';
import { useAppActions } from '../utils/hooks';
import { createExampleActions } from '../store/example/example-actions';

export function App(): React.ReactElement {
  const exampleState = useSelector<AppState, ExampleState>(
    (appState) => appState.example
  );

  const exampleActions = useAppActions(createExampleActions);

  useEffect(() => {
    exampleActions.getPieceOfInformation();
  }, [exampleActions]);

  return (
    <>
      <CssBaseline />
      <div>
        <h1>App</h1>
        <div>{exampleState.pieceOfInformation}</div>
      </div>
    </>
  );
}
