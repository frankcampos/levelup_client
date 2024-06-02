import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;
const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const editEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response)
    .then(resolve)
    .catch(reject);
});

const deleteEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}`, {
    method: 'DELETE',
  })
    .then((response) => response)
    .then(resolve)
    .catch(reject);
});

const leaveEvent = (event, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

const joinEvent = (event, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${event}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents,
  createEvent,
  editEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
};
