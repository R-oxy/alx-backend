// Node Redis client and async operations
import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Promisify the client.get method
const getAsync = promisify(client.get).bind(client);

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

// Function to display the value of a school from Redis using async/await
async function displaySchoolValue(schoolName) {
  try {
    const res = await getAsync(schoolName);
    console.log(res);
  } catch (err) {
    console.error(`Error getting value: ${err.message}`);
  }
}

// Call the functions with the specified arguments
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
