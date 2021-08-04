import { AppActionType } from '../base/app-action-type';
import { createInitialExampleState, ExampleState } from './example-state';
import { AppActionExample } from './example-actions';

export function exampleReducer(
  state: ExampleState = createInitialExampleState(),
  action: AppActionExample
): ExampleState {
  switch (action.type) {
    case AppActionType.ExampleGetPieceOfInformationPending:
      return {
        ...state,
        isLoading: true,
      };

    case AppActionType.ExampleGetPieceOfInformationFulfilled:
      return {
        ...state,
        isLoading: false,
        pieceOfInformation: action.payload,
      };

    case AppActionType.ExampleGetPieceOfInformationRejected:
      return {
        ...state,
        isLoading: false,
        pieceOfInformation: '',
      };

    default:
      return state;
  }
}
