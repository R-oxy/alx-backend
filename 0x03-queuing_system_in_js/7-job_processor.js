// Track progress and errors with Kue: Create the Job processor
import kue from 'kue';

const blacklistedNum = ['4153518780', '4153518781'];

/**
 * Send Notification
 * @param {string} phoneNumber - The phone number to send the notification to
 * @param {string} message - The message to send
 * @param {object} job - The job object
 * @param {function} done - Callback to signal job completion
 */
function sendNotification(phoneNumber, message, job, done) {
  const total = 100;

  job.progress(0, total);

  if (blacklistedNum.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  job.progress(50, total);
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );

  // Simulate async operation
  setTimeout(() => {
    job.progress(100, total);
    done();
  }, 2000);
}

const queue = kue.createQueue();
const queueName = 'push_notification_code_2';

queue.process(queueName, 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Event listeners for job progress, completion, and failure
queue.on('job complete', (id) => {
  console.log(`Notification job #${id} completed`);
});

queue.on('job failed', (id, errorMessage) => {
  console.log(`Notification job #${id} failed: ${errorMessage}`);
});

queue.on('job progress', (id, progress) => {
  console.log(`Notification job #${id} ${progress}% complete`);
});
