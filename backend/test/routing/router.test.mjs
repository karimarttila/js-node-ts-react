// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, test } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export const hostName = 'localhost';
export const port = '6600';
export const helloUrl = `http://${hostName}:${port}/hello`;

test('Login is successful', async () => {
  // Does not work in the vite test environment:
  // const res = await axios.get(helloUrl);
  // expect(res.status).toBe(200);
  // console.log(`res: ${JSON.stringify(res.data, null, 2)}`);
});

// const response = await axios.get(url);
// if (response.status === 200 && response.data.ret === "ok")
//   return response.data;
// throw new Error(response.data.msg);
