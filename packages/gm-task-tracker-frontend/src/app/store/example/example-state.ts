export interface ExampleState {
  readonly isLoading: boolean;
  readonly pieceOfInformation: string;
}

export function createInitialExampleState(): ExampleState {
  return {
    isLoading: false,
    pieceOfInformation: '',
  };
}
