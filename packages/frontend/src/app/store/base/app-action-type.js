export const AppActionType = Object.freeze({
  GenericNoop: 'GenericNoop',

  // example start
  ExampleGetExampleData: 'ExampleGetExampleData',
  ExampleGetExampleDataPending: 'ExampleGetExampleDataPending',
  ExampleGetExampleDataFulfilled: 'ExampleGetExampleDataFulfilled',
  ExampleGetExampleDataRejected: 'ExampleGetExampleDataRejected',
  // example end

  // auth start
  AuthRegister: 'AuthRegister',
  AuthRegisterPending: 'AuthRegisterPending',
  AuthRegisterFulfilled: 'AuthRegisterFulfilled',
  AuthRegisterRejected: 'AuthRegisterRejected',

  AuthLogin: 'AuthLogin',
  AuthLoginPending: 'AuthLoginPending',
  AuthLoginFulfilled: 'AuthLoginFulfilled',
  AuthLoginRejected: 'AuthLoginRejected',

  AuthLogout: 'AuthLogout',
  AuthLogoutPending: 'AuthLogoutPending',
  AuthLogoutFulfilled: 'AuthLogoutFulfilled',
  AuthLogoutRejected: 'AuthLogoutRejected',

  AuthClearRedirectToHome: 'AuthClearRedirectToHome',
  // auth end

  // example start
  TaskGetTasks: 'TaskGetTasks',
  TaskGetTasksPending: 'TaskGetTasksPending',
  TaskGetTasksFulfilled: 'TaskGetTasksFulfilled',
  TaskGetTasksRejected: 'TaskGetTasksRejected',
  // example end
});
