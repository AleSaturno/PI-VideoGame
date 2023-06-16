import { Link, useNavigate } from 'react-router-dom';
import { getAllGames, getGamesByName, getGenres } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import style from './Navbar.module.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres()); // Agregar paréntesis para llamar la función getGenres
  }, []);

  const onSearch = (name) => {
    dispatch(getGamesByName(name));
    navigate('/home');
  };
  

  return (
    <div className={style.nav}>
      <h1>VideoGames App</h1>
      <div className={style.botones}>
        <button className={style.Link}>
          <Link to='/home'>Home</Link>
        </button>
      </div>
      <div>
        <button className={style.Link}>
          <Link to='/createForm'>Crear un VideoJuego</Link>
        </button>
      </div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default NavBar;
