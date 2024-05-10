import React from 'react';
import { toast } from 'react-toastify';

const NotificationToast: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div>
    <strong>{title}</strong>
    <br />
    {body}
  </div>
);

export const showNotification = (title: string, body: string) => {
  toast(<NotificationToast title={title} body={body} />);
};
