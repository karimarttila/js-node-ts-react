// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';
import { validateUser, giveSessions, clearSessions } from '../../src/domaindb/users.mjs';
import { ValidationError } from '../../src/util/errors.mjs';

test('Validate user', () => {
  clearSessions();
  const sessions = giveSessions();
  // console.log(`sessions: ${JSON.stringify(sessions)}`);
  expect(sessions.length).toBe(0);
  const tokenJarska = validateUser('jarska', 'joo');
  expect(tokenJarska).not.toBe(null);
  expect(tokenJarska).not.toBe(undefined);
  expect(sessions.length).toBe(1);
  expect(sessions[0].username).toBe('jarska');
  expect(sessions[0].token).toBe(tokenJarska);
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
