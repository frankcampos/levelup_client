import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import router from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents, deleteEvent } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  },
  []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event card?')) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      <h1>Events</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard title={event.title} date={event.date} time={event.time} organizer={event.organizer.uid} description={event.description} id={event.id} game={event.game} onDelete={handleDelete} />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
