import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import router from 'next/router';
import { joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  description,
  date,
  time,
  organizer,
  id,
  game,
  onDelete,
  joined,
  onUpdate,
}) => {
  const { user } = useAuth();
  const { uid } = user;
  const handleDelete = () => {
    onDelete(id);
  };

  const handleLeave = () => {
    leaveEvent(id, uid).then(() => {
      onUpdate();
    });
  };

  const handleSignup = () => {
    joinEvent(id, uid).then(() => {
      onUpdate();
    });
  };

  return (
    <Card
      style={{
        width: '400px', alignContent: 'center', alignItems: 'center', margin: '20px', border: '1px solid black',
      }}
      className="text-center"
    >
      <Card.Body>
        <div>
          {joined
            ? <Button onClick={handleLeave} className="btn-danger">Leave</Button>
            : <Button onClick={handleSignup}>Signup</Button>}

        </div>
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
  joined: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
