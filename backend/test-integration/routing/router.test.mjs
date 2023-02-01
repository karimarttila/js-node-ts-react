// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from 'pactum';

const { spec } = pkg;

export const hostName = 'localhost';
export const port = '6600';
export const baseUrl = `http://${hostName}:${port}`;

// eslint-disable-next-line no-undef
it('Call hello', async () => {
  await spec()
    .get(`${baseUrl}/hello`)
    .expectStatus(200)
    .withJson({ message: 'Hello Yeah!' });
});

// eslint-disable-next-line no-undef
it('Call login', async () => {
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
