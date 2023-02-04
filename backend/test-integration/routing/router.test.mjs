// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from 'pactum';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

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
      username: 'jartsa',
      password: 'joo',
    })
    .expectStatus(200)
    .expectJsonLike({ ret: 'ok' });
});

// eslint-disable-next-line no-undef
it('Call /product-groups', async () => {
  const res = await axios.post(`${baseUrl}/login`, { username: 'jartsa', password: 'joo' });
  const { token } = res.data;
  await spec()
    .get(`${baseUrl}/product-groups`)
    .withHeaders({ 'x-token': token })
    .expectStatus(200)
    .expectJsonMatch({ ret: 'ok', product_groups: [{ pgId: 1, name: 'Books' }, { pgId: 2, name: 'Movies' }] });
});

// eslint-disable-next-line no-undef
it('Call /product-groups, token missing', async () => {
  await spec()
    .get(`${baseUrl}/product-groups`)
    .expectStatus(404);
});

// eslint-disable-next-line no-undef
it('Call /products/1', async () => {
  const res = await axios.post(`${baseUrl}/login`, { username: 'jartsa', password: 'joo' });
  const { token } = res.data;
  await spec()
    .get(`${baseUrl}/products/1`)
    .withHeaders({ 'x-token': token })
    .expectStatus(200)
    .expectBodyContains({
      pId: 2017,
      pgId: 1,
      title: 'Sinuhe egyptiläinen',
      price: 13.42,
      author:
      'Mika Waltari',
      year: 1945,
      country: 'Finland',
      language: 'Finnish',
    });
});

// eslint-disable-next-line no-undef
it('Call /product/2/49', async () => {
  const res = await axios.post(`${baseUrl}/login`, { username: 'jartsa', password: 'joo' });
  const { token } = res.data;
  await spec()
    .get(`${baseUrl}/product/2/49`)
    .withHeaders({ 'x-token': token })
    .expectStatus(200)
    .expectJsonMatch(
      {
        ret: 'ok',
        product: {
          pId: 49,
          pgId: 2,
          country: 'Italy-USA',
          director: 'Leone, Sergio',
          genre: 'Western',
          price: 14.4,
          title: 'Once Upon a Time in the West',
          year: 1968,
        },
      },
    );
});
