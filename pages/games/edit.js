import router from 'next/router';
import GameForm from '../../components/game/GameForm';
import { useAuth } from '../../utils/context/authContext';

const EditGame = () => {
  const { user } = useAuth();
  const game = JSON.parse(router.query.game);
  console.warn('game', game);
  return (
    <div>
      <h2>Edit Game</h2>
      <GameForm user={user} game={game} />
    </div>
  );
};

export default EditGame;
