import { Link, useNavigate } from 'react-router-dom';
import { getAllGames, getGamesByName, getGenres } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import style from './Navbar.module.css'

const NavBar = ({setPage}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, []);

  const onSearch = (name) => {
    dispatch(getGamesByName(name));
    navigate('/home');
    setPage(0);
  };

  const handleHomeButtonClick = () =>{
    window.location.reload()
  }


  return (
    <div className={style.nav}>
      <h1> Game World</h1>
      <div className={style.botones}>
        <button onClick={handleHomeButtonClick} className={style.Link}>
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
