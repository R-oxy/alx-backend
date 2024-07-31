```markdown
0x03. Queuing System in JS
==========================

## Resources
Read or watch:

- [Redis quick start](https://redis.io/topics/quickstart)
- [Redis client interface](https://redis.io/topics/clients)
- [Redis client for Node JS](https://www.npmjs.com/package/redis)
- [Kue deprecated but still used in the industry](https://github.com/Automattic/kue)

## Learning Objectives
At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to run a Redis server on your machine
- How to run simple operations with the Redis client
- How to use a Redis client with Node JS for basic operations
- How to store hash values in Redis
- How to deal with async operations with Redis
- How to use Kue as a queue system
- How to build a basic Express app interacting with a Redis server
- How to build a basic Express app interacting with a Redis server and queue

## Requirements
- All of your code will be compiled/interpreted on Ubuntu 18.04, Node 12.x, and Redis 5.0.7
- All of your files should end with a new line
- A README.md file, at the root of the folder of the project, is mandatory
- Your code should use the `.js` extension

## Required Files for the Project

### `package.json`
Click to show/hide file contents

### `.babelrc`
Click to show/hide file contents

And… Don’t forget to run `$ npm install` when you have the `package.json`

## Tasks

### 0. Install a redis instance
**Mandatory**

Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - https://redis.io/downloads/):

```sh
$ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
$ tar xzf redis-6.0.10.tar.gz
$ cd redis-6.0.10
$ make
```

Start Redis in the background with `src/redis-server`

```sh
$ src/redis-server &
```

Make sure that the server is working with a ping `src/redis-cli ping`

```sh
PONG
```

Using the Redis client again, set the value School for the key Holberton

```sh
127.0.0.1:[Port]> set Holberton School
OK
127.0.0.1:[Port]> get Holberton
"School"
```

Kill the server with the process id of the redis-server (hint: use ps and grep)

```sh
$ kill [PID_OF_Redis_Server]
```

Copy the `dump.rdb` from the redis-5.0.7 directory into the root of the Queuing project.

Requirements:

- Running `get Holberton` in the client, should return `School`

### 1. Node Redis Client
**Mandatory**

Install `node_redis` using npm

Using Babel and ES6, write a script named `0-redis_client.js`. It should connect to the Redis server running on your machine:

- It should log to the console the message `Redis client connected to the server` when the connection to Redis works correctly
- It should log to the console the message `Redis client not connected to the server: ERROR_MESSAGE` when the connection to Redis does not work

Requirements:

- To import the library, you need to use the keyword `import`

```sh
bob@dylan:~$ ps ax | grep redis-server
 2070 pts/1    S+     0:00 grep --color=auto redis-server
bob@dylan:~$ 
bob@dylan:~$ npm run dev 0-redis_client.js 

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "0-redis_client.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 0-redis_client.js`
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
Redis client not connected to the server: Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379
^C
bob@dylan:~$ 
bob@dylan:~$ ./src/redis-server > /dev/null 2>&1 &
[1] 2073
bob@dylan:~$ ps ax | grep redis-server
 2073 pts/0    Sl     0:00 ./src/redis-server *:6379
 2078 pts/1    S+     0:00 grep --color=auto redis-server
bob@dylan:~$
bob@dylan:~$ npm run dev 0-redis_client.js 

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "0-redis_client.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 0-redis_client.js`
Redis client connected to the server
^C
bob@dylan:~$
```

### 2. Node Redis client and basic operations
**Mandatory**

In a file `1-redis_op.js`, copy the code you previously wrote (`0-redis_client.js`).

Add two functions:

- `setNewSchool`:
  - It accepts two arguments `schoolName`, and `value`.
  - It should set in Redis the value for the key `schoolName`
  - It should display a confirmation message using `redis.print`
- `displaySchoolValue`:
  - It accepts one argument `schoolName`.
  - It should log to the console the value for the key passed as argument

At the end of the file, call:

- `displaySchoolValue('Holberton');`
- `setNewSchool('HolbertonSanFrancisco', '100');`
- `displaySchoolValue('HolbertonSanFrancisco');`

Requirements:

- Use callbacks for any of the operation, we will look at async operations later

```sh
bob@dylan:~$ npm run dev 1-redis_op.js 

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "1-redis_op.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 1-redis_op.js`
Redis client connected to the server
School
Reply: OK
100
^C

bob@dylan:~$
```

### 3. Node Redis client and async operations
**Mandatory**

In a file `2-redis_op_async.js`, let’s copy the code from the previous exercise (`1-redis_op.js`)

Using `promisify`, modify the function `displaySchoolValue` to use ES6 `async` / `await`

Same result as `1-redis_op.js`

```sh
bob@dylan:~$ npm run dev 2-redis_op_async.js

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "2-redis_op_async.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 2-redis_op_async.js`
Redis client connected to the server
School
Reply: OK
100
^C

bob@dylan:~$
```

### 4. Node Redis client and advanced operations
**Mandatory**

In a file named `4-redis_advanced_op.js`, let’s use the client to store a hash value

#### Create Hash:
Using `hset`, let’s store the following:

- The key of the hash should

 be `HolbertonSchools`
- It should have a value for:
  - `Portland`=50
  - `Seattle`=80
  - `New York`=20
  - `Bogota`=20
  - `Cali`=40
  - `Paris`=2

#### Display Hash:
Using `hgetall`, display the object stored in Redis

Requirements:

- Use callbacks for any of the operation, we will look at async operations later

```sh
bob@dylan:~$ npm run dev 4-redis_advanced_op.js

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "4-redis_advanced_op.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 4-redis_advanced_op.js`
Redis client connected to the server
Reply: 1
Reply: 1
Reply: 1
Reply: 1
Reply: 1
Reply: 1
{
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2'
}
^C

bob@dylan:~$
```

### 5. Node Redis client publisher and subscriber
**Mandatory**

In a file named `5-subscriber.js`, create a Redis client:

- It should connect to the Redis server
- It should subscribe to a channel named `holberton school channel`
- When it receives message on this channel, it should log to the console `Message received: MESSAGE`

In a file named `5-publisher.js`, create another Redis client:

- It should connect to the Redis server
- It should publish a message to the channel named `holberton school channel`, with the message being `Holberton Student #1 starts course`

Requirements:

- The subscriber should receive the message

```sh
bob@dylan:~$ node 5-subscriber.js
Redis client connected to the server
Message received: Holberton Student #1 starts course

bob@dylan:~$ node 5-publisher.js 
Redis client connected to the server

bob@dylan:~$
bob@dylan:~$ node 5-subscriber.js
Redis client connected to the server
Message received: Holberton Student #1 starts course

bob@dylan:~$ 
```

### 6. Create the Job creator
**Mandatory**

In a file named `6-job_creator.js`:

- Create a queue with Kue
- Create an object containing the Job data with the following format:
  - `phoneNumber`: string
  - `message`: string
- Create a queue named `push_notification_code`, and create a job with the object created before
- When the job is created without error, log to the console `Notification job created: JOB_ID`
- When the job is failing, log to the console `Notification job JOB_ID failed: ERROR`
- When the job is completed, log to the console `Notification job JOB_ID completed`

```sh
bob@dylan:~$ npm run dev 6-job_creator.js

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "6-job_creator.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_creator.js`
Notification job created: 1
^C
bob@dylan:~$
```

### 7. Create the Job processor
**Mandatory**

In a file named `6-job_processor.js`:

- Create a queue with Kue
- Create a function named `sendNotification` with two arguments `phoneNumber` and `message`. This function logs to the console `Sending notification to PHONE_NUMBER, with message: MESSAGE`
- Write a queue process that will listen to new jobs on `push_notification_code`:
  - Whenever a job is created, call the function `sendNotification` with the phone number and the message contained within the job

```sh
bob@dylan:~$ npm run dev 6-job_processor.js

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "6-job_processor.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_processor.js`
Sending notification to 4153518780, with message: This is the code to verify your account
^C
bob@dylan:~$
```

### 8. Track progress and errors with Kue: Create the Job creator
**#advanced**

In a file named `8-job_creator.js`, modify the job creator to track the progress and update it every second

Requirements:

- You need to create a new queue `push_notification_code_2`
- Create an object containing the job data:
  - `phoneNumber`: string
  - `message`: string
- Write a queue process that will listen to new jobs on `push_notification_code_2`
- Every new job should have a progress update that is sent every second

### 9. Track progress and errors with Kue: Create the Job processor
**#advanced**

In a file named `8-job_processor.js`, modify the job processor to update the progress and report any error

Requirements:

- Write a queue process that will listen to new jobs on `push_notification_code_2`
- Every new job should have a progress update that is sent every second
- When the job is 50% completed, it should fail with an error

### 10. Writing the Job creation function with test coverage
**#advanced**

In a file named `9-job_creator.js`, create a function named `createPushNotificationsJobs`:

- It takes into argument `jobs` (array of objects), and `queue` (Kue queue)
- If `jobs` is not an array, it should throw an `Error` `Jobs is not an array`
- For each job in `jobs`, create a job in the queue `push_notification_code_3` with the job data:
  - If there is an error, log to the console `Notification job JOB_ID failed: ERROR`
  - If a job is completed, log to the console `Notification job JOB_ID completed`

In a file named `9-job_creator.test.js`, write a test suite for `createPushNotificationsJobs`:

- Check that if jobs is not an array, it throws an error with the message `Jobs is not an array`
- Check that when jobs is an empty array, it does nothing
- Check that when jobs is an array, it creates a job for each job in the array

```sh
bob@dylan:~$ npm run test 9-job_creator.test.js

> queuing_system_in_js@1.0.0 test /root
> mocha "9-job_creator.test.js"


  createPushNotificationsJobs
    ✓ should throw an error if jobs is not an array
    ✓ should do nothing if jobs is an empty array
    ✓ should create a job for each job in the array


  3 passing (32ms)

bob@dylan:~$
```

### 11. Writing the Job processing function with test coverage
**#advanced**

In a file named `9-job_processor.js`, create a function named `processPushNotificationsJobs`:

- It takes into argument `queue` (Kue queue)
- Write a queue process that will listen to new jobs on `push_notification_code_3`
- Every new job should have a progress update that is sent every second

In a file named `9-job_processor.test.js`, write a test suite for `processPushNotificationsJobs`:

- Check that if the queue is empty, it does nothing
- Check that when a new job is created, it processes it and sends a notification

```sh
bob@dylan:~$ npm run test 9-job_processor.test.js

> queuing_system_in_js@1.0.0 test /root
> mocha "9-job_processor.test.js"


  processPushNotificationsJobs
    ✓ should do nothing if the queue is empty
    ✓ should process a new job and send a notification


  2 passing (34ms)

bob@dylan:~$
```