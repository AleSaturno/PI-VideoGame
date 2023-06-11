import {Link} from 'react-router-dom';
import React from 'react';

const Card = ({game}) =>{
    return(
        <Link to={`/detail/${game.id}`}>
        <div>
           <h1>{game.name}</h1>
           <h2>Genres: {game.genres}</h2>
           <img src={game.background_image} alt="Cargando..." />
        </div>        
        </Link>
    )
}

export default Card;