import { createSlice } from '@reduxjs/toolkit';
import { NotificationStatus } from '../../components/shared/notifications/notification-status';

const initialState = {
  notifications: [],
};

export const uiNotificationSlice = createSlice({
  name: 'ui-notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    dismissNotification(state, action) {
      state.notifications.forEach((n) => {
        if (n.id === action.payload) {
          n.status = NotificationStatus.dismissed;
        }
      });
    },
    dismissAllNotifications(state) {
      state.notifications.forEach((n) => {
        n.status = NotificationStatus.dismissed;
      });
    },
    syncNotificationsToDisplay(state) {
      state.notifications = state.notifications
        .filter((n) => n.status !== NotificationStatus.dismissed)
        .map((n) => ({
          ...n,
          status: NotificationStatus.active,
        }));
    },
  },
});

export const {
  addNotification,
  removeNotification,
  dismissNotification,
  dismissAllNotifications,
  syncNotificationsToDisplay,
} = uiNotificationSlice.actions;

export const selectNotifications = (state) =>
  state.uiNotification.notifications;

export const uiNotificationReducer = uiNotificationSlice.reducer;
