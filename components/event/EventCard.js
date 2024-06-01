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
  onDelete,
}) => {
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
      <Card.Body>
        <Card.Title>{date}</Card.Title>
        <Card.Text>{time}</Card.Text>
        <Card.Text>description: {description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          style={{ margin: '10px' }}
          onClick={() => {
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
        <Button onClick={handleDelete} style={{ color: 'white', background: 'red', margin: '10px' }}>Delete</Button>
      </div>
    </Card>
  );
};

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  game: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventCard;
