import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import useGetAllNotifications from '../../../controllers/useGetAllNotifications.js';
import Notification from './../notificationCard.js';

function NotificationList() {
    const {  notifications, fetchNotifications, error } = useGetAllNotifications();
    useEffect(() => {
        const fetchData = async () => {
            await fetchNotifications();
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000); // 10 secs.
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return (
            <Alert data-test-id="get-notifications-error-alert" variant="danger">
                {"Failed to get notifications: " + error}
            </Alert>
        )
    }

    if (notifications && notifications.length === 0) {
        return (
            <Alert data-test-id="no-notifications-alert" variant="info">
                {"No notifications"}
            </Alert>
        )
    }
   
    return (
        notifications && notifications.map((notification, index) => (
                <Notification key={index} notification={notification} dataTestID={`notification-${index}`} data-test-id={`notification-${index}`}/>
        ))
    )
}

export default NotificationList;
