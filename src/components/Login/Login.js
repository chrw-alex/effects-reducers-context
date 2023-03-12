import { useState, useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (prevState, action) => {
  switch (action.type) {
    case 'EMAIL_CHANGED':
      return {
        value: action.value,
        isValid: action.value.includes('@')
      }
    case 'INPUT_BLUR':
      return {
        value: prevState.value,
        isValid: prevState.value.includes('@')
      }
    default:
      return {
        value: '',
        isValid: undefined
      }
  }
}

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case 'PASSWORD_CHANGED':
      return {
        value: action.value,
        isValid: action.value.trim().length > 7
      }
    case 'PASSWORD_BLUR':
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 7
      }
    default:
      return {
        value: '',
        isValid: undefined
      }
  }
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: undefined })
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: undefined })

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: 'EMAIL_CHANGED', value: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: 'PASSWORD_CHANGED', value: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: 'PASSWORD_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${passwordState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
