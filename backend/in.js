const redis = require('redis');

const redisHost = '127.0.0.1';
const redisPort = 6379;

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

client.on('connect', () => {
  console.log('Connected to Redis server');
});

client.on('error', (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});

client.on('end', () => {
  console.log('Connection to Redis server closed');
});

client.on('ready', () => {
  console.log('Redis client is ready');
});

client.on('reconnecting', (params) => {
  console.log('Attempting to reconnect to Redis server', params);
});

client.on('warning', (warning) => {
  console.warn('Redis client warning', warning);
});
