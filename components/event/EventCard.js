import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  description,
  date,
  time,
  organizer,
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
  </Card>
);

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
};

export default EventCard;
