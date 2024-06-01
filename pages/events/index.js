import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import router from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  console.warn(events);

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
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard title={event.title} date={event.date} time={event.time} organizer={event.organizer.uid} description={event.description} id={event.id} game={event.game} />
        </section>
      ))}
    </article>
  );
}

export default Home;
