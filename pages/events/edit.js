import router from 'next/router';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';

const EditEvent = () => {
  const { user } = useAuth();
  const event = JSON.parse(router.query.event);
  console.warn('event', event);
  return (
    <div>
      <h2>Edit Event</h2>
      <EventForm user={user} event={event} />
    </div>
  );
};

export default EditEvent;
