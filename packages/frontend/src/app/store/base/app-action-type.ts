export enum AppActionType {
  GenericNoop = 'GenericNoop',

  // example start
  ExampleGetPieceOfInformation = 'ExampleGetPieceOfInformation',
  ExampleGetPieceOfInformationPending = 'ExampleGetPieceOfInformationPending',
  ExampleGetPieceOfInformationFulfilled = 'ExampleGetPieceOfInformationFulfilled',
  ExampleGetPieceOfInformationRejected = 'ExampleGetPieceOfInformationRejected',
  // example end

  // example start
  TaskGetTasks = 'TaskGetTasks',
  TaskGetTasksPending = 'TaskGetTasksPending',
  TaskGetTasksFulfilled = 'TaskGetTasksFulfilled',
  TaskGetTasksRejected = 'TaskGetTasksRejected',
  // example end
}
