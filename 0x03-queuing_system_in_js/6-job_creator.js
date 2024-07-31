// Create the Job creator
import kue from 'kue';

// Initialize Kue Queue
const queue = kue.createQueue();

// Function to create a job
const createJob = (phoneNumber, message) => {
  const jobFormat = {
    phoneNumber,
    message,
  };

  const queueName = 'push_notification_code';

  return new Promise((resolve, reject) => {
    const job = queue.create(queueName, jobFormat).save((err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Notification job created: ${job.id}`);
        resolve(job);
      }
    });
  });
};

// Function to handle job events
const handleJobEvents = (job) => {
  job.on('complete', () => {
    console.log('Notification job completed');
  });

  job.on('failed', (errorMessage) => {
    console.log(`Notification job failed: ${errorMessage}`);
  });
};

// Create a job with example data
createJob('4153518780', 'This is the code to verify your account')
  .then((job) => {
    handleJobEvents(job);
  })
  .catch((err) => {
    console.error(`Error creating job: ${err.message}`);
  });
