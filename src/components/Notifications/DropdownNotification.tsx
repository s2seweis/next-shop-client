import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../../styles/scss/layout/public/DropDownNotifications.module.scss';
import { fetchNotifications, markNotificationsAsRead } from '../../redux/slices/notificationSlice';
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import { RootState } from '../../redux/store';

// Define a TypeScript interface for Notification
interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

const DropdownNotification: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loadedNotifications, setLoadedNotifications] = useState<number>(2);
  const [notificationsRead, setNotificationsRead] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // Ensure that notifications are correctly typed as an array of Notification
  const notifications = useAppSelector((state: RootState) => state.notification.notifications as Notification[]);
  
  // Function to count unread notifications
  const countUnreadNotifications = (notifications: Notification[]): number => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Get count of unread notifications
  const unreadNotificationsCount = countUnreadNotifications(notifications);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !notificationsRead) {
      dispatch(markNotificationsAsRead());
      setNotificationsRead(true);
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    // Reset loaded notifications when notification list changes
    setLoadedNotifications(2);
  }, [notifications]);

  // Format dates
  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  };

  // Load more notifications
  const loadMoreNotifications = () => {
    setLoadedNotifications(prev => prev + 2);
  };

  return (
    <div className={styles.dropdown1}>
      <div className={styles.icon1} onClick={toggleMenu}>
        <FaBell />
        <div style={{ position: 'absolute', marginTop: '-46px', marginLeft: '-4px' }}>
          <div style={{ fontSize: '18px', marginLeft: '11px', display: 'flex', justifyContent: 'center' }}>
            {/* Display the number of notifications or null if notifications are read */}
            <p style={{ color: "red" }}>{notificationsRead ? null : unreadNotificationsCount === 0 ? "" : unreadNotificationsCount}</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.menu1}>
          <Link href="#">
            <div className={styles.menuLink1}>
              <div ref={containerRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <h2 style={{ textAlign: "center" }}>Notifications</h2>
                {notifications.length > 0 ? (
                  [...notifications] // Create a new array to sort
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, loadedNotifications)
                    .map((notification) => (
                      <div style={{ background: "#f1f1f1" }} key={notification.id}>
                        <div>Date: {formatCreatedAt(notification.createdAt)}</div>
                        <div>Title: {notification.title}</div>
                        <div>Body: {notification.body}</div>
                      </div>
                    ))
                ) : (
                  <p>No notifications available</p>
                )}
                {loadedNotifications < notifications.length && (
                  <button style={{ textAlign: 'center' }} onClick={loadMoreNotifications}>Load More</button>
                )}
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;
