// Node Redis client publisher and subscriber
const redis = require('redis');

// Create a Redis client
const subscriber = redis.createClient();

// Handle connection
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle errors
subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
subscriber.subscribe('holberton school channel');

// Handle messages
subscriber.on('message', (channel, message) => {
  console.log(message);

  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
