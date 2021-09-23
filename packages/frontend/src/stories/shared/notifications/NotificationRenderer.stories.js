import React, { useMemo } from 'react';
import { NotificationSeverity } from '../../../components/shared/notifications/notification-severity';
import { configureStore } from '@reduxjs/toolkit';
import {
  addNotification,
  uiNotificationReducer,
} from '../../../app/store/ui-notification-slice';
import { Provider, useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { NotificationRenderer } from '../../../components/shared/notifications/NotificationRenderer';
import { createNotificationData } from '../../../components/shared/notifications/notification-utils';

export default {
  title: 'shared/notifications/NotificationRenderer',
  component: NotificationRenderer,
};

function createStore() {
  return configureStore({ reducer: { uiNotification: uiNotificationReducer } });
}

const Template = () => {
  const store = useMemo(() => createStore(), []);

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <NotificationRendererWrapper />
      </SnackbarProvider>
    </Provider>
  );
};

const NotificationRendererWrapper = () => {
  const dispatch = useDispatch();

  function onAddNotification() {
    dispatch(
      addNotification(
        createNotificationData(
          NotificationSeverity.warning,
          'Some warning message.'
        )
      )
    );
  }

  return (
    <div>
      <button onClick={onAddNotification}>New Notifications</button>
      <NotificationRenderer />
    </div>
  );
};

export const Simple = Template.bind({});
Simple.args = {};
