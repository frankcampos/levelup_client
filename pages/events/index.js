import React, { useEffect, useState } from 'react';
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
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard title={event.title} date={event.date} time={event.time} organizer={event.organizer.uid} description={event.description} />
        </section>
      ))}
    </article>
  );
}

export default Home;
