const TYPES = {
  FRIEND_REQUEST: {
    key: 'FRIEND_REQUEST',
    title: 'Friend request',
    body: 'You have a new friend request',
  },
  EVENT_REQUEST: {
    key: 'EVENT_REQUEST',
    title: 'Event request',
    body: 'Someone wants to join your event',
  },
  EVENT_INVITE: {
    key: 'EVENT_INVITE',
    title: 'Event invite',
    body: 'You have been invited to join an event',
  },
  EVENT_CANCELLED: {
    key: 'EVENT_CANCELLED',
    title: 'Event cancelled',
    body: 'An event you were attending has been cancelled',
  },
};

module.exports = TYPES
