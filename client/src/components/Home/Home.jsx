import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';

const Home = () => {
  const allGames = useSelector((state) => state.allGames);
  const gamesByName = useSelector((state) => state.gamesByname);

  const [games, setGames] = useState([]);

  useEffect(() => {
    if (gamesByName.length) {
      setGames(gamesByName);
    } else if (allGames.length) {
      setGames(allGames);
    }
  }, [allGames, gamesByName]);

  return (
    <div>
      <Cards games={games} />
    </div>
  );
};

export default Home;
