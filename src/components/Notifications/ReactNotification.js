import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactNotificationComponent = ({ title = "This is title", body = "Some body" }) => {
  // Determine whether to hide notification based on title
  const hideNotif = title === "";

  // Show toast notification if title is not empty
  if (!hideNotif) {
    toast.info(<Display />);
  }

  // Display component with title and body
  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }

  // Render ToastContainer with specified options
  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  );
};

// Define prop types for title and body
ReactNotificationComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default ReactNotificationComponent;
