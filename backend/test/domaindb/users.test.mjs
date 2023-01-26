// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';
import {
  validateUser, giveSessions, clearSessions, findSessionByToken, validateToken,
} from '../../src/domaindb/users.mjs';
import { ValidationError } from '../../src/util/errors.mjs';

test('Validate users', () => {
  clearSessions();
  const sessions = giveSessions();
  // console.log(`sessions: ${JSON.stringify(sessions)}`);
  expect(sessions.length).toBe(0);
  const tokenJarska = validateUser('jarska', 'joo');
  expect(tokenJarska).not.toBe(null);
  expect(tokenJarska).not.toBe(undefined);
  const decodedToken = validateToken(tokenJarska);
  expect(decodedToken).not.toBe(null);
  expect(decodedToken).not.toBe(undefined);
  expect(decodedToken.username).toBe('jarska');
  expect(sessions.length).toBe(1);
  expect(sessions[0].username).toBe('jarska');
  expect(sessions[0].token).toBe(tokenJarska);
  const sessionJartsa = findSessionByToken(tokenJarska);
  expect(sessionJartsa).not.toBe(null);
  expect(sessionJartsa).not.toBe(undefined);
  expect(sessionJartsa.username).toBe('jarska');
  expect(sessionJartsa.password).toBe('joo');
  expect(sessionJartsa.token).toBe(tokenJarska);
  const tokenRane = validateUser('rane', 'jee');
  expect(tokenRane).not.toBe(null);
  expect(tokenRane).not.toBe(undefined);
  expect(sessions.length).toBe(2);
  expect(sessions[1].username).toBe('rane');
  expect(sessions[1].token).toBe(tokenRane);
  // Create a new session for jarska: the old one should be removed.
  const tokenJarska2 = validateUser('jarska', 'joo');
  expect(tokenJarska2).not.toBe(null);
  expect(tokenJarska2).not.toBe(undefined);
  expect(sessions.length).toBe(2);
  // Order counts: should be implementation detail, but let's not worry about it in this demo.
  expect(sessions[1].username).toBe('jarska');
  expect(sessions[1].token).toBe(tokenJarska2);
});

test('Validation of a user fails', () => {
  clearSessions();
  const sessions = giveSessions();
  // console.log(`sessions: ${JSON.stringify(sessions)}`);
  expect(sessions.length).toBe(0);
  expect(() => validateUser('jarska', 'WRONG-PASSWORD')).toThrowError(new ValidationError('Invalid username or password'));
});
