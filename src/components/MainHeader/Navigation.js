import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

import styles from "./Navigation.module.css";

const Navigation = (props) => {
  const authContext = useContext(AuthContext)
  return (
    <nav className={styles.nav}>
      <ul>
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Пользователи</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Админ</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <button onClick={authContext.onLogout}>Выйти</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
