import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import router from 'next/router';

function GameCard({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
  id,
  onDelete,
}) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Card
      style={{
        width: '400px', alignContent: 'center', alignItems: 'center', margin: '20px', border: '1px solid black',
      }}
      className="text-center"
    >
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{ margin: '10px' }}
          onClick={() => {
            router.push({
              pathname: '/games/edit',
              query: {
                game: JSON.stringify({
                  title, maker, numberOfPlayers, skillLevel, gameType, id,
                }),
              },
            });
          }}
        >Edit Game
        </Button>
        <Button onClick={handleDelete} style={{ color: 'white', background: 'red', margin: '10px' }}>Delete</Button>
      </div>

    </Card>
  );
}
GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameType: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GameCard;
