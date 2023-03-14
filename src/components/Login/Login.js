import { useState, useReducer, useEffect, useContext, useRef } from "react";
import AuthContext from '../../context/auth-context';
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from '../UI/Input/Input';

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
  const context = useContext(AuthContext)

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: undefined })
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: undefined })

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

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
    if (formIsValid) {
      context.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          className={`${emailState.isValid === false ? styles.invalis : ""}`}
          id='email'
          type='email'
          label='Email'
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          className={`${passwordState.isValid === false ? styles.invalid : ""}`}
          type="password"
          id="password"
          label='Пароль'
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
