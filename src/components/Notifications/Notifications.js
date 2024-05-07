import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/firebase/firebaseInit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Test - rendered 2 times?");
  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("line:444", data);
      }
      return data;
    }

    tokenFunc();
  }, []);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;

// https://www.youtube.com/watch?v=IK8x7qc9ZsA