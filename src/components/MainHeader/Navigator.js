import React, { useContext } from "react";
import styles from "./Navigator.module.css";
import AuthContext from "../context/auth-context";
import Button from "../UI/Button/Button";
const Navigator = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <nav className={styles.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">{authCtx.email}</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <Button onClick={authCtx.onLogOut}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigator;
