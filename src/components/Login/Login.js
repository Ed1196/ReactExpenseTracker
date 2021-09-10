import React, {
  useRef,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AuthContext from "../context/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "INPUT_VALUE") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT_VALUE") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: validEmail } = emailState;
  const { isValid: validPassword } = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(validEmail && validPassword);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [validEmail, validPassword]);
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_VALUE", val: event.target.value });
  };
  const validatePasswordHandler = (event) => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "INPUT_VALUE", val: event.target.value });
  };
  const validateEmailHandler = (event) => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogIn(emailState.value, passwordState.value);
    } else if (!validEmail) {
      emailInputRef.current.highlight();
    } else {
      passwordInputRef.current.highlight();
    }
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
