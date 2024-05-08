import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../../styles/scss/layout/public/DropDownNotifications.module.scss';
import { fetchNotifications, markNotificationsAsRead } from '../../redux/slices/notificationSlice'; // Assuming you have a function for marking notifications as read
import { useAppSelector, useAppDispatch } from '@/src/redux/hooks';
import { RootState } from '../../redux/store';

const DropdownNotification: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadedNotifications, setLoadedNotifications] = useState(2);
  const [notificationsRead, setNotificationsRead] = useState(false);
  

  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state: RootState) => state.notification.notifications);
  console.log('line:100', notifications);
  

  const countUnreadNotifications = (notifications: Notification[]): number => {
    return notifications.filter(notification => !notification.read).length;
  };

  const unreadNotificationsCount = countUnreadNotifications(notifications);
  
  
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !notificationsRead) {
      // Mark notifications as read when opening the menu
      dispatch(markNotificationsAsRead());
      setNotificationsRead(true);
    }
  };

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    // Load initial notifications
    setLoadedNotifications(2);
  }, [notifications]);

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Convert createdAt to a readable format
  };

  const loadMoreNotifications = () => {
    setLoadedNotifications(prev => prev + 2);
  };

  return (
    <div className={styles.dropdown1}>
      <div className={styles.icon1} onClick={toggleMenu}>
        <FaBell />
        <div
          style={{
            position: 'absolute',
            marginTop: '-46px',
            marginLeft: '-4px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              marginLeft: '11px',
              // width: '150px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Display the number of notifications or null if notifications are read */}
            <p style={{color:"red"}}>{notificationsRead ? null : unreadNotificationsCount === 0 ? "" : unreadNotificationsCount} </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.menu1}>
          <Link href="">
            <div className={styles.menuLink1}>
              <div ref={containerRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <h2 style={{textAlign:"center"}}>Notifications</h2>
                {notifications.length > 0 ? ( // Check if notifications array is not empty
                  <div>
                    {[...notifications] // Create a new array before sorting
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by createdAt in descending order
                      .slice(0, loadedNotifications) // Include only the latest loaded notifications
                      .map((notification, index) => (
                        <div style={{background:"#f1f1f1"}} key={notification.id}>
                          <div>Date: {formatCreatedAt(notification.createdAt)}</div> {/* Format createdAt field */}
                          <div>Title: {notification.title}</div>
                          <div>Body: {notification.body}</div>
                        </div>
                      ))}
                    {loadedNotifications < notifications.length && (
                      <div style={{ textAlign: 'center' }}>
                        <button onClick={loadMoreNotifications}>Load More</button>
                      </div>
                    )}
                  </div>
                ) : ( // Render dummy content when notifications array is empty
                  <p>No notifications available</p>
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
