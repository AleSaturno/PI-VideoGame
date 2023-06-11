import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [gameDetail, setGameDetail] = useState({});

  useEffect(() => {
        const getAxios = async () => {
        const detail = await axios.get(`http://localhost:3001/videogames/${id}`);
        setGameDetail(detail.data);
        };
        getAxios();
    },[id]);
  
 
  
    return (
        <div>
          {Object.keys(gameDetail).length > 0 ? (
            <>
              <h1>{gameDetail.name}</h1>
              <h2>Genres: {gameDetail.genres?.map(genre => genre.name).join(' , ')}</h2>
              <h2>Rating: {gameDetail.rating}</h2>
              <h2>Platforms: {gameDetail.platforms?.platform && gameDetail.platforms.platform.map(platform => platform.name).join(', ')}</h2>
              <h2>Released: {gameDetail.platforms?.released_at}</h2>
              <h2>Requirements: {gameDetail.platforms?.requirements}</h2>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      );
      
};

export default Detail;
