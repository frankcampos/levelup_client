import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import router from 'next/router';

const EventCard = ({
  description,
  date,
  time,
  organizer,
  id,
  game,
}) => (
  <Card
    style={{
      width: '400px', alignContent: ' center', alignItems: 'center', margin: '20px',
    }}
    className="text-center"
  >
    <Card.Body>
      <Card.Title>{date}</Card.Title>
      <Card.Text>{time}</Card.Text>
      <Card.Text>description: {description}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
    <Button onClick={() => {
      router.push({
        pathname: '/events/edit',
        query: {
          event: JSON.stringify({
            description, date, time, organizer, id, game,
          }),
        },
      });
    }}
    >Edit Event
    </Button>
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  game: PropTypes.number.isRequired,
};

export default EventCard;
