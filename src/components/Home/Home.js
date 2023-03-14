import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import Button from '../UI/Button/Button';

import Card from "../UI/Card/Card";
import styles from "./Home.module.css";

const Home = (props) => {
  const context = useContext(AuthContext)
  return (
    <Card className={styles.home}>
      <h1>Рады Вас Видеть Снова!</h1>
      <Button onClick={context.onLogout}>Выход</Button>
    </Card>
  );
};

export default Home;
