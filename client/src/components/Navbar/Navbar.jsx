import {NavLink, useNavigate} from 'react-router-dom';
import {getAllGames , getGamesByName , getGenres} from '../../redux/actions';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';


const NavBar = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() =>{
        dispatch(getAllGames())
        dispatch(getGenres)
    }, [])
    const onSearch = (name) =>{
        dispatch(getGamesByName(name))
        navigate('/home')
    }

    return(
        <div>
            <h1>VideoGames App</h1>
        </div>,
        <div>
            <NavLink to='/home'>Home</NavLink>
        </div>,
        <div>
            <NavLink to='/createForm'>Crear un VideoJuego</NavLink> 
        </div>,
        <div>
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}

export default NavBar