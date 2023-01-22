import jwt from 'jsonwebtoken';
import logger from '../util/logger.mjs';
import { ValidationError } from '../util/errors.mjs';

const EXPRIRES_IN = 1800;

// Simulate user database.
const userDb = [
  { username: 'jarska', password: 'joo' },
  { username: 'rane', password: 'jee' },
  { username: 'd', password: 'd' },
];

function checkPassword(username, password) {
  const user = userDb.find((u) => u.username === username);
  if (user === undefined) {
    return false;
  }
  return user.password === password;
}

// This should be a real secret, of course. This is just a demo.
const SECRET = 'mysecret';

function createSessionDb() {
// Simulate session database.
  const sessionDb = [];
  function giveSessions() {
    return sessionDb;
  }
  function clearSessions() {
    sessionDb.length = 0;
  }
  function findSession(session) {
    return sessionDb.find((s) => s.username === session.username);
  }
  function addSession(session) {
    const i = sessionDb.findIndex((s) => s.username === session.username);
    if (i !== -1) {
      // Remove old session.
      sessionDb.splice(i, 1);
    }
    sessionDb.push(session);
  }

  return {
    giveSessions, findSession, addSession, clearSessions,
  };
}

const {
  giveSessions, findSession, addSession, clearSessions,
} = createSessionDb();

/**
 * Generates a token.
 * @param {String} username
 * @returns token
 */
function generateToken(username) {
  return jwt.sign({ username }, SECRET, { expiresIn: EXPRIRES_IN });
}

/**
 * Validates a token.
 * @param {String} token
 * @throws {JsonWebTokenError} if token is invalid
 * @returns token decoded
 */
function validateToken(token) {
  const decoded = jwt.verify(token, SECRET);
  return decoded;
}

function validateUser(username, password) {
  logger.debug(`ENTER validateUser, username: ${username}, password: ${password}`);
  const valid = checkPassword(username, password);
  if (!valid) {
    throw new ValidationError('Invalid username or password');
  }
  const token = generateToken(username);
  const newSession = { username, token };
  addSession(newSession);

  return token;
}

// const myToken = generateToken('jarska');
// console.log(`myToken: ${myToken}`);
// const decoded = validateToken(myToken);
// console.log(`decoded: ${JSON.stringify(decoded)}`);
// let token = validateUser('jarska', 'joo');
// console.log(`token: ${token}`);
// const sessions = giveSessions();
// console.log(`sessions: ${JSON.stringify(sessions)}`);
// token = validateUser('rane', 'jee');
// console.log(`sessions: ${JSON.stringify(sessions)}`);
// token = validateUser('jarska', 'joo');
// console.log(`sessions: ${JSON.stringify(sessions)}`);

export {
  validateToken, validateUser, giveSessions, clearSessions,
};
