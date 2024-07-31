// Create the Job processor
import kue from 'kue';

// Initialize Kue Queue
const queue = kue.createQueue();

// Function to send notifications
const sendNotification = (phoneNumber, message) => {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Process jobs from the queue
queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message);
  done();
});

// Handle errors
queue.on('error', (err) => {
  console.error(`Queue error: ${err.message}`);
});
