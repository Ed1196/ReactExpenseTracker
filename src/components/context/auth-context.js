import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  email:"",
  isLoggedIn: false,
  onLogOut: () => {},
  onLogIn: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const logInToken = localStorage.getItem("isLoggedIn");
    const logEmail = localStorage.getItem("email");
    if (logInToken === "1" && logEmail.trim().length !== 0) {
      setIsLoggedIn(true);
      setEmail(logEmail);
    }
  }, []);

  const logInHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("email", email);
    setIsLoggedIn(true);
    setEmail(email);
  };
  const logOutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        email: email,
        isLoggedIn: isLoggedIn,
        onLogIn: logInHandler,
        onLogOut: logOutHandler,
      }}
    >{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
