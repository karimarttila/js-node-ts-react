# Javascript-Node (backend) / Typescript-React (frontend) demonstration app

## Introduction

I created this Javascript-Node (backend) / Typescript-React (frontend) demonstration application for my learning purposes. I'm about to start a new project at the beginning of 2023 using these technologies, and I wanted to learn to use these tools and technologies in practice before I start working on the project. I have used React with [Clojurescript](https://clojurescript.org/) / [Reagent](https://reagent-project.github.io/), and therefore it is interesting to compare my Clojurescript experience to Typescript / React when implementing this demonstration application.

In this repository, I have implemented the same webstore demo application that I previously implemented as a Clojure full-stack app, described in my blog post: [Clojure Re-Frame Exercise](https://www.karimarttila.fi/clojure/2020/10/15/clojure-re-frame-exercise.html), but this time using Javascript and Typescript.

Thanks to [Thomas De Bluts](https://www.linkedin.com/in/thomas-de-bluts-296a74131/) for all the help while learning these technologies!

Also thanks to all of those in [Koodiklinikka Slack](https://koodiklinikka.fi/), in channels `#javascript`, `#typescript` and `#react` for all the wonderful help and support! Especially I'd like to name [Aarni Koskela](https://github.com/akx), [Pete Nykänen](https://github.com/petetnt), [Jussi Kinnula]( https://github.com/jussikinnula), [Juha Pekkarinen](https://github.com/sirjuan), [Toni Parviainen](https://www.linkedin.com/in/toniparviainen/), and [Kalle Ranki](https://www.linkedin.com/in/kalle-ranki/) - I got their permission to mention their names in the Koodiklinikka slack. If you are a Finnish developer, I really recommend using the excellent Koodiklinikka Slack if you want to learn new programming languages or technologies - there are a lot of competent experts in the Koodiklinikka Slack willing to help each other.

## Quick Installation Guide

TODO

## Technologies

Here is a short description of the technologies used in this demonstration application:

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is a lightweight interpreted language that runs in the browser, and on the backend using Node.
- [Node](https://nodejs.org/en/) is a Javascript runtime for the backend.
- [Typescript](https://www.typescriptlang.org/) is a strongly typed programming language for Javascript.
- [React](https://reactjs.org/) is a popular JavaScript library for building user interfaces for the browser.
- [Redux](https://redux.js.org/) is a popular state management library for Javascript Applications.
- [Vite](https://vitejs.dev/) is a tool for frontend development (e.g. hot reloading for the browser).
- [Tailwind](https://tailwindcss.com/) is a popular CSS utility library.
- [Serverless Framework](https://www.serverless.com/) for running the server in local development and deploying to AWS.

## Starter templates

There are several good templates for this kind of full-stack app. I used:

- [node-express-starter-2022](https://github.com/redcartel/node-express-starter-2022) for the backend development.
- [choisohyun/react-vite-ts-boilerplate](https://github.com/choisohyun/react-vite-ts-boilerplate) for the frontend development.
- [akx/vite-react-ts-template](https://github.com/akx/vite-react-ts-template) for the frontend development.
- [serverless-esbuild](https://github.com/floydspace/serverless-esbuild) for the backend development using serverless-esbuild.
- [aws-node-express-api](https://github.com/serverless/examples/tree/v3/aws-node-express-api) for the backend and serverless development.
- [Serverless NodeJS Template](https://gitlab.com/garethm/serverless-nodejs-template) for how to do serverless local development.


## Backend

The backend is quite simple. There are three endpoints:

```yaml
      - httpApi: 'GET /product-groups'
      - httpApi:
          path: /products/{pgId}
          method: get
      - httpApi:
          path: /product/{pgId}/{pId}
          method: get
```

So, we simulate a webstore: you can query product groups, get a listing of products belonging to a product group, and query a specific product.

## Backend Development

### Nodemon

You can keep your serverless backend up and running with [nodemon](https://nodemon.io/):

```json
"dev": "nodemon --exec serverless offline start",
```

### VSCode Debugger

You can use VSCode debugger with this `launch.json` configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/backend/src/domaindb/domain.mjs"
    }
  ]
}
```

At the end of your Javascript file under debugging add code to call the function you want to debug, example:

```Javascript
// For debugging using the node Run and Debug REPL.
const debugRet = await getProductGroups();
logger.debug('debugRet: ', debugRet);
```

Then in VSCode:

Use `Run and Debug` (VSCode: left panel).
Then `Run Javascript debug terminal` (VSCode upper left corner).
Set a breakpoint in `domain.jms` file.
Open terminal, `cd backend` and run e.g. `node src/domaindb/domain.mjs` => debugger stops in the breakpoint.

This way you can debug an individual file using the VSCode debugger.

### Experimenting with Quokka

You can use [Quokka](https://quokkajs.com/) VSCode extension for various experimentations.

### ESLint

Install [ESLint](https://eslint.org/) and configure it - you get various useful warnings in VSCode while you are programming.

Initialize the ESLint configuration by running:

```bash
pnpm create @eslint/config
```

I used the [airbnb](https://github.com/airbnb/javascript) style guide (recommended by the one and only source of truth: [Koodiklinikka-slack](https://koodiklinikka.fi/)).

### Import vs Require Hassle

There were quite a lot of hassle and linter warnings regarding whether to use import or require. Once I fixed the linter warnings, the Serverless local development broke. Finally, I managed to find the right import setup to satisfy both the ESLint and Serverless local development. 

Then I tried the [VSCode Debugger](#vscode-debugger) and the imports broke once again. Example:

```Javascript
import pkg from 'fs';
const { promises: fs } = pkg;
// NOTE: This is not working when using Node Run and Debug REPL.
// const fs = require('fs').promises;
```

I'm not a Javascript guru so I won't dive any deeper into this mess.

### Asynchronous Programming

Since the Javascript engine runs with just one thread the engine uses an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). Therefore most libraries use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). You can get a bit "synchronous" nature to this programming model using [async/await](https://www.w3schools.com/js/js_async.asp) model. Example:

```Javascript
...
// Internal function to load the products to the domain db.
async function loadProducts(pgId) {
  logger.debug(`ENTER domain.loadProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  if ((domain[productsKey] === null) || (domain[productsKey] === undefined)) {
    const productsCsvFile = `resources/pg-${pgId}-products.csv`;
    const csvContents = await fs.readFile(productsCsvFile, 'utf8'); // ==> HERE !!!!
...
```

`fs.readFile` is asynchronous. But we need the data here, so we `await`. Therefore we need to mark the function as `async`. Any caller of this function needs to remember this:

```Javascript
async function getProducts(pgId) {
  logger.debug(`ENTER domain.getProducts, pgId: ${pgId}`);
  const productsKey = `pg-${pgId}-products`;
  let products = domain[productsKey];
  if ((products === null) || (products === undefined)) {
    await loadProducts(pgId);   // ==========> HERE !!!!!!!!!!!!!!!!
    products = domain[productsKey];
  }
  logger.debug('EXIT domain.getProducts');
  return products;
}
```

### Functional Programming

Functional programming is quite nice with Javascript. If you have been programming e.g. [Clojure](https://clojure.org/) you have no issues using map/reduce/filter with Javascript. Example:

```Javascript
    const ret = rows.reduce((acc, row) => {
      if (row.length === 2) {
        const [key, val] = row;
        acc[key] = val;
      }
      return acc;
    }, {});
```

### Javascript Programming Experience

Javascript is a quite nice functional programming language. I especially like the functional features and literal data structures. The asynchronous nature of Javascript (just one thread) is a bit eccentric. What I miss is a good [REPL-driven development](https://clojure.org/guides/repl/introduction) DX as you have with [Clojure](https://clojure.org/) - not possible since Javascript is not a [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)) (not a [homoiconic language](https://en.wikipedia.org/wiki/Homoiconicity)) - a real REPL is not just possible with Javascript.

## Frontend

The frontend is a simple [React](https://reactjs.org/) application written using [Typescript](https://www.typescriptlang.org/). I use [Vite](https://vitejs.dev/) frontend development (bundling etc.). As a CSS utility library, I use [Tailwind](https://tailwindcss.com/). I also use a couple of other libraries, e.g. [Redux](https://redux.js.org/) for state management, and [React Router](https://reactrouter.com/en/main) as a frontend routing library.

## Frontend Development

### Starter

I used [akx/vite-react-ts-template](https://github.com/akx/vite-react-ts-template) for the frontend development. This template seemed to be a bit simpler than the other frontend starter project I listed above in chapter [Starter templates](#starter-templates). Install it using:

```bash
npx degit akx/vite-react-ts-template
```

### React

I have used React previously with [Clojurescript](https://clojurescript.org/) / [Reagent](https://reagent-project.github.io/) - so I'm not a complete newbie with React.

But I had never used React with Javascript / Typescript. Therefore, before implementing this exercise, I read the excellent new beta [React Docs](https://beta.reactjs.org/). I strongly recommend browsing through that documentation and doing the exercises - the documentation and exercises create a strong mental model for you to understand React better.

### React Router

Since I use React, using [React Router](https://reactrouter.com/en/main) as a frontend routing library is natural.

Before implementing my own routing for this demo application, I did the excellent [React Routing Tutorial](https://reactrouter.com/en/main/start/tutorial).

TODO: Kerro tässä evoluutio: 
- Ensin Axios ja oma state.
- Sitten swr
- Sitten siirretty loaderiin
- (ks. git historysta: product_groups.tsx)


### Typescript

Typescript selvästi auttoi funktioiden parametrien tyypityksessä yms. Selvästikin olisi kannattanut tehdä myös backend Typescriptilla (mutta halusin tehdä Javascriptilla koska alkavassa projektissa käytetään sitä).

### Vite

Live reload yms.



### Tailwind

See instructions in [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then I followed: [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite).

### JSX vs Hiccup

TODO: vertaa JSX Clojurescript Hiccup.

### Asynchronous Programming Model

The asynchronous programming model is something that you need to remember both in the backend and in the frontend side. Example:

```Typescript
export default function ProductGroups() {
  const productGroupsSWR = useSWR(url, fetchJSON);
  const productGroups = productGroupsSWR.data?.product_groups;
...
          <ProductGroupsTable productGroups={productGroups} />
...
```

The `productGroups` are not there when we try to mount the ProductGroupsTable. Therefore we need to check if the data has arrived:

```Typescript
          {productGroups && (
            <ProductGroupsTable productGroups={productGroups} />
          )}
```

I was wondering this and find out the problem using `console.log` in the `ProductGroupsTable` component.

## Serverless Local Development

This demo app uses instructions provided in the [Serverless local development](https://www.serverless.com/blog/serverless-local-development) blog post and the [Serverless Offline](https://www.serverless.com/plugins/serverless-offline) plugin.

Using the Serverless local development you can run your server in your local development simulating the actual serverless production environment (in our case, AWS Lambda).

## Deployment to AWS

TODO




