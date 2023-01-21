import jwt from 'jsonwebtoken';
import logger from '../util/logger.mjs';

// Simulate user database.
const userDb = [
  { username: 'user1', password: 'pw1' },
  { username: 'user2', password: 'pw2' },
];

// Simulate session database.
const sessionDb = [];
