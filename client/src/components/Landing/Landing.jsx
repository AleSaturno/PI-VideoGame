import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';
import Fondo from './Fondo.jpeg'; 

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.principal}>
      <button className={styles.buttonContainer} onClick={() => navigate('/home')}>START</button>
      <div className={styles.imageContainer}>
        <img src={Fondo} alt="Imagen de la Landing Page" />
      </div>
    </div>
  );
};

export default Landing;

