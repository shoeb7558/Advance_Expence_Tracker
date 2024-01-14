import React, { useState, useEffect, useRef } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '', // Add the email property
    itemCount: 0,
    login: (token, email) => {},
    logout: () => {},
    updateItemCount: (count) => {},
  });

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialemail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialemail);
  const [itemCount, setItemCount] = useState(0);
 
 
  const timeoutRef = useRef(null);
  const isMounted = useRef(true);

  const loginHandler = (token, email) => {
    
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    scheduleTokenRemoval();
  };
  

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("tokenTimeout");
    
    clearTokenRemoval();
    
  };

  const scheduleTokenRemoval = () => {
    clearTokenRemoval();

    // Save the current time in localStorage
    localStorage.setItem("tokenTimeout", Date.now().toString());

    // Automatically remove the token from local storage after 5 minutes
    timeoutRef.current = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("tokenTimeout");
    },5 * 60 * 1000); // 5 minutes in milliseconds
  };

  const clearTokenRemoval = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    const tokenTimeout = localStorage.getItem("tokenTimeout");
    const elapsedTime = Date.now() - Number(tokenTimeout);

    if (token && tokenTimeout && elapsedTime < 300000) {
      // Calculate the remaining time and reschedule the token removal
      timeoutRef.current = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("tokenTimeout");
      }, 5 * 60 * 1000 - elapsedTime);
    } else {
      clearTokenRemoval();
    }
    if (isMounted.current) {
        const itemCount = localStorage.getItem("itemCount");
        setItemCount(itemCount ? parseInt(itemCount) : 0);
      }

    return () => {
      isMounted.current = false;
      clearTokenRemoval();
    };
  }, [token]);

  const contextValue = {
    token: token,
    isLoggedIn: !!token,
    email: email,
    itemCount: itemCount,
    login: loginHandler,
    logout: logoutHandler,
    updateItemCount: (count) => setItemCount(count),
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
