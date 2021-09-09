import { AppActionType } from '../base/app-action-type';
import { createInitialExampleState } from './example-state';

export function exampleReducer(state = createInitialExampleState(), action) {
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
