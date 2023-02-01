// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from 'pactum';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { PutFunctionConcurrencyRequestFilterSensitiveLog } from '@aws-sdk/client-lambda';

const { spec } = pkg;

export const hostName = 'localhost';
export const port = '6600';
export const baseUrl = `http://${hostName}:${port}`;

// eslint-disable-next-line no-undef
it('Call /hello', async () => {
  await spec()
    .get(`${baseUrl}/hello`)
    .expectStatus(200)
    .withJson({ message: 'Hello Yeah!' });
});

// eslint-disable-next-line no-undef
it('Call /login', async () => {
  await spec()
    .post(`${baseUrl}/login`)
    .withHeaders({ 'Content-Type': 'application/json' })
    .withJson({
      username: 'jarska',
      password: 'joo',
    })
    .expectStatus(200)
    .expectJsonLike({ ret: 'ok' });
});

it('Call /product-groups', async () => {
  const res = await axios.post(`${baseUrl}/login`, { username: 'jarska', password: 'joo' });
  const { token } = res.data;
  await spec()
    .get(`${baseUrl}/product-groups`)
    .withHeaders({ 'x-token': token })
    .expectStatus(200)
    .expectJsonMatch({ ret: 'ok', product_groups: [{ pgId: 1, name: 'Books' }, { pgId: 2, name: 'Movies' }] });
});

// TODO: kirjoita testit:
// - header x-token puuttuu => 404
// - /products/:pgId
// - /product/:pgId/:pId
// Sitten kirjoita BLOGI backend testauksesta.
// Sitten toteuta login frontendiin ja kirjoita siitä blogi.
