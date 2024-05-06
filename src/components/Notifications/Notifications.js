import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/firebase/firebaseInit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token:", data);
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;