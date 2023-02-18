import jwt from 'jsonwebtoken';
import logger from '../util/logger.mjs';
import { ValidationError } from '../util/errors.mjs';

const EXPRIRES_IN = 1800;

// Simulate user database.
// NOTE: Session database is in memory, so it won't work with serverless:
// You should persist sessions to database.
const userDb = [
  { username: 'jartsa', password: 'joo' },
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
  function findSessionByToken(token) {
    return sessionDb.find((s) => s.token === token);
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
    giveSessions, findSession, findSessionByToken, addSession, clearSessions,
  };
}

const {
  giveSessions, findSession, addSession, clearSessions, findSessionByToken,
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
  const decodedToken = jwt.verify(token, SECRET);
  const session = findSessionByToken(token);
  if (!session) {
    throw new ValidationError('Token not found in the session database');
  }
  if (!decodedToken) {
    throw new ValidationError('Could not decode token');
  }
  if (session.username !== decodedToken.username) {
    throw new ValidationError('Token username does not match the session username');
  }
  return decodedToken;
}

function validateUser(username, password) {
  logger.debug(`ENTER validateUser, username: ${username}, password: ${password}`);
  const valid = checkPassword(username, password);
  if (!valid) {
    throw new ValidationError('Invalid username or password');
  }
  const token = generateToken(username);
  const newSession = { username, password, token };
  addSession(newSession);

  return token;
}

export {
  validateToken, validateUser, giveSessions, clearSessions, findSessionByToken,
};
