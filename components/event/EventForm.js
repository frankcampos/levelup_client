import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, editEvent } from '../../utils/data/eventData';

const initialState = {
  userId: 0,
  game: 0,
  date: '',
  time: '',
  description: '',
};

const EventForm = ({ user, event }) => {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const [games, setGames] = useState([]);
  const router = useRouter();
  console.warn('event game', event.game);

  if (event && event.id) {
    initialState.game = event.game.id;
    initialState.date = event.date;
    // Extract and format the time
    const eventDate = new Date(event.time);
    const hours = eventDate.getUTCHours().toString().padStart(2, '0');
    const minutes = eventDate.getUTCMinutes().toString().padStart(2, '0');
    initialState.time = `${hours}:${minutes}`;

    initialState.description = event.description;
  }

  console.warn('event game', event?.game?.title);

  useEffect(() => {
    getGames().then(setGames);
  },
  []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.id) {
      const eventDateTime = `${currentEvent.date}T${currentEvent.time}:00Z`;
      const eventObject = {
        id: event.id,
        userId: user.uid,
        game: Number(currentEvent.game),
        date: currentEvent.date,
        time: eventDateTime,
        description: currentEvent.description,
      };
      editEvent(eventObject).then(() => router.push('/events'));
    } else {
      const eventTime = `${currentEvent.date}T${currentEvent.time}:00Z`;

      const eventObject = {
        userId: user.uid,
        game: Number(currentEvent.game),
        date: currentEvent.date,
        time: eventTime,
        description: currentEvent.description,
      };

      createEvent(eventObject).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="game">
          <Form.Label>Game</Form.Label>
          <Form.Control as="select" name="game" value={currentEvent.game} onChange={handleChange}>
            <option value="0">Select a game</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={currentEvent.time}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={currentEvent.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.number,
  }).isRequired,
  event: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    date: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  event: {
    id: null,
    game: null,
    date: '',
    time: '',
    description: '',
  },
};

export default EventForm;
