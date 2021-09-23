import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  dismissNotification,
  removeNotification,
  selectNotifications,
  syncNotificationsToDisplay,
} from '../../../app/store/ui-notification-slice';
import { NotificationStatus } from './notification-status';
import { NotificationCloseButton } from './NotificationCloseButton';

export function NotificationRenderer() {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    // if nothing to change
    if (
      !notifications.some(
        (n) =>
          n.status === NotificationStatus.pending ||
          n.status === NotificationStatus.dismissed
      )
    ) {
      return;
    }

    notifications.forEach((n) => {
      const { id, status } = n;
      if (status === NotificationStatus.dismissed) {
        closeSnackbar(id);
      } else if (status === NotificationStatus.pending) {
        const snackbarData = toSnackbarData(n, dispatch);
        enqueueSnackbar(snackbarData.message, snackbarData.options);
      }
    });

    dispatch(syncNotificationsToDisplay());
  }, [notifications, enqueueSnackbar, closeSnackbar, dispatch]);

  return null;
}

function toSnackbarData(notificationData, dispatch) {
  return {
    message: notificationData.message,
    options: {
      key: notificationData.id,
      variant: notificationData.severity,
      action: (key) => (
        <NotificationCloseButton
          onClose={() => {
            dispatch(dismissNotification(key));
          }}
        />
      ),
      onClose: (_event, _reason, _key) => {
        // console.log(event, reason, key);
      },
      onExited: (_event, key) => {
        dispatch(removeNotification(key));
      },
    },
  };
}

NotificationRenderer.propTypes = {};
