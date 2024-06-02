import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, editGame, getGameTypes } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user, game }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  console.warn('this is my game.gametype', game.gameType);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  if (game) {
    initialState.skillLevel = game.skillLevel;
    initialState.numberOfPlayers = game.numberOfPlayers;
    initialState.title = game.title;
    initialState.maker = game.maker;
    initialState.gameTypeId = game.gameType;
  }

  console.warn('this are my gametypes', gameTypes);

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then(setGameTypes);
  }, [game, user]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (game.id) {
      const gameObject = {
        id: game.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameTypeId),
        userId: user.uid,
      };
      editGame(gameObject).then(() => router.push('/games'));
    } else {
      const gameObject = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameTypeId),
        userId: user.uid,
      };

      // Send POST request to your API
      createGame(gameObject).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required type="number" value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Skill Level</Form.Label>
          <Form.Control name="skillLevel" required type="number" value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Control name="gameTypeId" required as="select" value={currentGame.gameTypeId} onChange={handleChange}>
            <option value="0">Select a Game Type</option>
            {gameTypes.map((gameType) => (
              <option key={gameType.id} value={gameType.id}>
                {gameType.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control name="userId" required value={user.uid} readOnly />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  game: PropTypes.shape({
    id: PropTypes.number,
    maker: PropTypes.string,
    title: PropTypes.string,
    numberOfPlayers: PropTypes.number,
    skillLevel: PropTypes.number,
    gameType: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  game: {},
};

export default GameForm;
