import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import router from 'next/router';

const GameCard = ({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
  id,
}) => (
  <Card
    style={{
      width: '400px', alignContent: ' center', alignItems: 'center', margin: '20px',
    }}
    className="text-center"
  >
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {maker}</Card.Title>
      <Card.Text>{numberOfPlayers} players needed</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    <Button onClick={() => {
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
  </Card>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameType: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default GameCard;
