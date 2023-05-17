import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // check to see if the user is authenticated or not
        await axios.post("/dj-rest-auth/token/refresh/");
        // if the user is logged in, the code below will run:
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // if the user is not logged in, the code in the catch block will run:
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
