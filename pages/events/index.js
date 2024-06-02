import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import router from 'next/router';
import EventCard from '../../components/event/EventCard';
import {
  getEvents, deleteEvent,
} from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const { uid } = user;
  const [update, setUpdate] = useState(0);

  console.warn('uid', uid);
  console.warn('events', events);

  const fetchEvents = async () => {
    const data = await getEvents(uid);
    setEvents(data);
  };
  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
  };

  useEffect(() => {
    fetchEvents();
  }, [user, update]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  return (
    <article className="events">
      <Button onClick={() => router.push('/events/new')}>Register New Event</Button>
      <h1>Events</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard
              onUpdate={onUpdate}
              title={event.title}
              date={event.date}
              time={event.time}
              organizer={event.organizer.uid}
              description={event.description}
              id={event.id}
              game={event.game}
              onDelete={handleDelete}
              joined={event.joined}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
