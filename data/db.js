const bcrypt = require('bcrypt');

// Helper function to hash passwords
const hashPassword = (password) => bcrypt.hashSync(password, 10);

const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    password: hashPassword('password123'),
  },
  {
    id: '2',
    name: 'Bob Smith',
    username: 'bobsmith',
    email: 'bob@example.com',
    password: hashPassword('secure456'),
  },
  {
    id: '3',
    name: 'Charlie Brown',
    username: 'charlieb',
    email: 'charlie@example.com',
    password: hashPassword('mysecret789'),
  },
];

const posts = [
  {
    id: '101',
    userId: '1',
    title: 'First Post',
    content: 'This is my first post on this platform!',
    createdAt: new Date(),
  },
  {
    id: '102',
    userId: '2',
    title: 'Hello World',
    content: 'Excited to join this community. Hello everyone!',
    createdAt: new Date(),
  },
  {
    id: '103',
    userId: '3',
    title: 'Dev Thoughts',
    content: 'Just started learning Express.js and it’s fun!',
    createdAt: new Date(),
  },
];

const comments = [
  {
    id: '1001',
    postId: '101',
    userId: '2',
    content: 'Welcome to the platform!',
    createdAt: new Date(),
  },
  {
    id: '1002',
    postId: '101',
    userId: '3',
    content: 'Looking forward to more of your posts!',
    createdAt: new Date(),
  },
  {
    id: '1003',
    postId: '102',
    userId: '1',
    content: 'Glad to have you here!',
    createdAt: new Date(),
  },
];

module.exports = {
  users,
  posts,
  comments,
};
