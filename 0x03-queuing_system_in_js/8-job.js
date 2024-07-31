// Writing the job creation function
import kue from 'kue';

/**
 * Create push notification jobs
 * @param {Array} jobs - Array of job objects
 * @param {Object} queue - Kue queue instance
 */
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  const queueName = 'push_notification_code_3';

  jobs.forEach((jobData) => {
    const job = queue.create(queueName, jobData).save((err) => {
      if (!err) {
        console.log(`Notification job created: ${job.id}`);
      }
    });

    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    job.on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err}`);
    });

    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
}

export default createPushNotificationsJobs;
