import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import parser from 'html-react-parser';

const Detail = () => {
  const { id } = useParams();
  const [gameDetail, setGameDetail] = useState({});

  useEffect(() => {
    const getAxios = async () => {
      const detail = await axios.get(`http://localhost:3001/videogames/${id}`);
      setGameDetail(detail.data);
    };
    getAxios();
  }, [id]);

  if (gameDetail.description) {
    return (
      <div>
        <div>
          <h1>{gameDetail.name}</h1>
          <img src={gameDetail.background_image} width="600px" height="auto" alt="Loading..." />
          <h2>Genres: {gameDetail.genres.map(genre => genre.name).join(', ')}</h2>
          <h2>Rating: {gameDetail.rating}</h2>
          {gameDetail.platforms && Array.isArray(gameDetail.platforms) && gameDetail.platforms.length > 0 && (
            <h2>Platforms: {gameDetail.platforms.map(platform => platform.platform.name).join(' ,  ')}</h2>
          )}
          <h2>Released: {gameDetail.released}</h2>
          <h3>Description: {parser(gameDetail.description)}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }
};

export default Detail;

