import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames, deleteGame } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const fetchGames = async () => {
    const data = await getGames();
    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this game card?')) {
      await deleteGame(id);
      fetchGames();
    }
  };

  return (
    <article style={{ margin: 'auto', width: '80%', textAlign: 'center' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
      }}
      >
        <Button
          style={{ margin: '10px' }}
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
        <h1 style={{ margin: '10px' }}>Games</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {games.map((game) => (
          <section key={`game--${game.id}`} style={{ margin: '10px' }}>
            <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} gameType={game.game_type.id} id={game.id} onDelete={handleDelete} />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
