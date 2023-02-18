// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';
import {
  validateUser, giveSessions, clearSessions, findSessionByToken, validateToken,
} from '../../src/db/users.mjs';
import { ValidationError } from '../../src/util/errors.mjs';

test('Validate users ok', () => {
  clearSessions();
  const sessions = giveSessions();
  // console.log(`sessions: ${JSON.stringify(sessions)}`);
  expect(sessions.length).toBe(0);
  const tokenJartsa = validateUser('jartsa', 'joo');
  expect(tokenJartsa).not.toBe(null);
  expect(tokenJartsa).not.toBe(undefined);
  const decodedToken = validateToken(tokenJartsa);
  expect(decodedToken).not.toBe(null);
  expect(decodedToken).not.toBe(undefined);
  expect(decodedToken.username).toBe('jartsa');
  expect(sessions.length).toBe(1);
  expect(sessions[0].username).toBe('jartsa');
  expect(sessions[0].token).toBe(tokenJartsa);
  const sessionJartsa = findSessionByToken(tokenJartsa);
  expect(sessionJartsa).not.toBe(null);
  expect(sessionJartsa).not.toBe(undefined);
  expect(sessionJartsa.username).toBe('jartsa');
  expect(sessionJartsa.password).toBe('joo');
  expect(sessionJartsa.token).toBe(tokenJartsa);
  const tokenRane = validateUser('rane', 'jee');
  expect(tokenRane).not.toBe(null);
  expect(tokenRane).not.toBe(undefined);
  expect(sessions.length).toBe(2);
  expect(sessions[1].username).toBe('rane');
  expect(sessions[1].token).toBe(tokenRane);
  // Create a new session for jartsa: the old one should be removed.
  const tokenJartsa2 = validateUser('jartsa', 'joo');
  expect(tokenJartsa2).not.toBe(null);
  expect(tokenJartsa2).not.toBe(undefined);
  expect(sessions.length).toBe(2);
  // Order counts: should be implementation detail, but let's not worry about it in this demo.
  expect(sessions[1].username).toBe('jartsa');
  expect(sessions[1].token).toBe(tokenJartsa2);
});

test('Validation of a user fails', () => {
  clearSessions();
  const sessions = giveSessions();
  // console.log(`sessions: ${JSON.stringify(sessions)}`);
  expect(sessions.length).toBe(0);
  expect(() => validateUser('jartsa', 'WRONG-PASSWORD')).toThrowError(new ValidationError('Invalid username or password'));
});
