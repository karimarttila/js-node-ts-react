# Javascript-Node (backend) / Typescript-React (frontend) demonstration app

## Introduction

I created this Javascript-Node (backend) / Typescript-React (frontend) demonstration application for my learning purposes. I'm about to start a new project at the beginning of 2023 using these technologies, and I wanted to learn to use these tools and technologies in practice before I start working on the project. I have used React with [Clojurescript](https://clojurescript.org/) / [Reagent](https://reagent-project.github.io/), and therefore it is interesting to compare my Clojurescript experience to Typescript / React when implementing this demonstration application.

In this repository, I have implemented the same webstore demo application that I previously implemented as a Clojure full-stack app, described in my blog post: [Clojure Re-Frame Exercise](https://www.karimarttila.fi/clojure/2020/10/15/clojure-re-frame-exercise.html), but this time using Javascript and Typescript.

Thanks to [Thomas De Bluts](https://www.linkedin.com/in/thomas-de-bluts-296a74131/) for all the help while learning these technologies!

Also thanks to all of those in [Koodiklinikka Slack](https://koodiklinikka.fi/), in channels `#javascript`, `#typescript` and `#react` for all the wonderful help and support! Especially I'd like to name [Aarni Koskela](https://github.com/akx), [Pete Nykänen](https://github.com/petetnt), [Jussi Kinnula]( https://github.com/jussikinnula), [Juha Pekkarinen](https://github.com/sirjuan), [Toni Parviainen](https://www.linkedin.com/in/toniparviainen/), and [Kalle Ranki](https://www.linkedin.com/in/kalle-ranki/) - I got their permission to mention their names in the Koodiklinikka slack. If you are a Finnish developer, I really recommend using the excellent Koodiklinikka Slack if you want to learn new programming languages or technologies - there are a lot of competent experts in the Koodiklinikka Slack willing to help each other.

## Related Blog Posts

I wrote four blog posts related to this exercise:

- [Javascript and Node Impressions](https://www.karimarttila.fi/javascript/2022/12/24/javascript-node-impressions.html)
- [Typescript and React Impressions](https://www.karimarttila.fi/typescript/2022/12/30/typescript-react-impressions.html)
- [Javascript Backend Testing
](https://www.karimarttila.fi/javascript/2023/02/03/javascript-backend-testing.html)
- [React State Management](https://www.karimarttila.fi/react/2023/02/13/react-state-management.html)

There is also an equivalent implementation using Clojure. You might find it interesting to compare these two solutions: [clojure-full-stack-demo](https://github.com/karimarttila/clojure-full-stack-demo).

## Quick Installation Guide

Just use `pnpm install` and `pnpm dev` both in the backend and frontend sides.

## Technologies

Here is a short description of the technologies used in this demonstration application:

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is a lightweight interpreted language that runs in the browser, and on the backend using Node.
- [Node](https://nodejs.org/en/) is a Javascript runtime for the backend.
- [Typescript](https://www.typescriptlang.org/) is a strongly typed programming language for Javascript.
- [React](https://reactjs.org/) is a popular JavaScript library for building user interfaces for the browser.
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

You can keep your serverless backend up and running with [nodemon](https://nodemon.io/), see See in [package.json](backend/package.json):

```json
"dev": "nodemon --exec node app.mjs",
```

I.e. run:

```bash
pnpm dev
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
      "program": "${workspaceFolder}/backend/src/db/domain.mjs"
    }
  ]
}
```

At the end of your Javascript file under debugging add code to call the function you want to debug, example:

```javascript
// For debugging using the node Run and Debug REPL.
const debugRet = await getProductGroups();
logger.debug('debugRet: ', debugRet);
```

Then in VSCode:

Use `Run and Debug` (VSCode: left panel).
Then `Run Javascript debug terminal` (VSCode upper left corner).
Set a breakpoint in `domain.jms` file.
Open terminal, `cd backend` and run e.g. `node src/db/domain.mjs` => debugger stops in the breakpoint.

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

```javascript
import pkg from 'fs';
const { promises: fs } = pkg;
// NOTE: This is not working when using Node Run and Debug REPL.
// const fs = require('fs').promises;
```

I'm not a Javascript guru so I won't dive any deeper into this mess.

### Asynchronous Programming

Since the Javascript engine runs with just one thread the engine uses an [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). Therefore most libraries use [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). You can get a bit "synchronous" nature to this programming model using [async/await](https://www.w3schools.com/js/js_async.asp) model. Example:

```javascript
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

```javascript
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

```javascript
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

## Serverless Local Development

This demo app uses instructions provided in the [Serverless local development](https://www.serverless.com/blog/serverless-local-development) blog post and the [Serverless Offline](https://www.serverless.com/plugins/serverless-offline) plugin.

Using the Serverless local development you can run your server in your local development simulating the actual serverless production environment (in our case, AWS Lambda).


## Frontend

The frontend is a simple [React](https://reactjs.org/) application written using [Typescript](https://www.typescriptlang.org/). I use [Vite](https://vitejs.dev/) frontend development (bundling etc.). As a CSS utility library, I use [Tailwind](https://tailwindcss.com/). I also use a couple of other libraries, e.g. [React Router](https://reactrouter.com/en/main) as a frontend routing library.

## Frontend Development

### Starter

I used [akx/vite-react-ts-template](https://github.com/akx/vite-react-ts-template) for the frontend development. This template seemed to be a bit simpler than the other frontend starter project I listed above in chapter [Starter templates](#starter-templates). Install it using:

```bash
npx degit akx/vite-react-ts-template
```

### Start Development Server

See in [package.json](frontend/package.json):

```json
"dev": "vite --port 6610"
```

I.e., run:

```bash
pnpm dev
```

### React

I have used React previously with [Clojurescript](https://clojurescript.org/) / [Reagent](https://reagent-project.github.io/) - so I'm not a complete newbie with React.

But I had never used React with Javascript / Typescript. Therefore, before implementing this exercise, I read the excellent new beta [React Docs](https://beta.reactjs.org/). I strongly recommend browsing through that documentation and doing the exercises - the documentation and exercises create a strong mental model for you to understand React better.

### React Router

Since I use React, using [React Router](https://reactrouter.com/en/main) as a frontend routing library is a natural choice.

Before implementing the routing for this demo application, I did the excellent [React Routing Tutorial](https://reactrouter.com/en/main/start/tutorial). After implementing the demo application I realized that most of the stuff in that tutorial is not needed in a simple frontend application like in the demo app I implemented. More about that in the next chapter.

### Comparing SWR React Hook and React-router Loader Pattern

NOTE: I, later on, changed the loading data pattern (Product page) to use the SRW hook method, as well.

React-router provides API for fetching the data needed in the React component, see [Loading Data](https://reactrouter.com/en/main/start/tutorial#loading-data) chapter in the tutorial. This is an IoC (inverse of control, a.k.a. Hollywood principle): you provide a function for fetching the data and provide the function when configuring the router. Then the React component can get the loader using `import { useLoaderData } from "react-router-dom";` API.

Compare the solutions:

- [main.tsx](https://github.com/karimarttila/js-node-ts-react/blob/main/frontend/src/main.tsx): react-router configuration.
- [product.tsx](https://github.com/karimarttila/js-node-ts-react/blob/main/frontend/src/routes/product.tsx): React-router loader pattern.
- [products.tsx](https://github.com/karimarttila/js-node-ts-react/blob/main/frontend/src/routes/products.tsx): Using SWR react hook in the React component.

When implementing the demo app, the evolution of fetching data was like this:

1. I first started using [Axios](https://axios-http.com/docs/intro) and [React state](https://beta.reactjs.org/learn/managing-state).

```typescript
export default function ProductGroups() {
  return productGroupsPage;
  const [productGroups, setProductGroups] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log("response", response);
        console.log("product_groups", response.data.product_groups);
        if (response.status === 200 && response.data.ret === "ok")
          setProductGroups(response.data.product_groups);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <Header />
        {productGroups && <ProductGroupsTable productGroups={productGroups} />}
      </div>
    </div>
  );
}
```

2. Then based on the feedback given in the [Koodiklinikka slack](https://koodiklinikka.fi/), I converted the React state / Axios using [SWR](https://github.com/vercel/swr) React hook for fetching data (see: [products.tsx](https://github.com/karimarttila/js-node-ts-react/blob/main/frontend/src/routes/products.tsx)).

```typescript
export default function Products() {
  const { pgId } = useParams();
  const pgIdNum = parseInt(pgId || "-1");
  const productGroupsSWR = useSWR<ProductGroupsResponse>(productGroupsUrl, fetchJSON);
  const productGroups = productGroupsSWR.data?.product_groups;
  const pgName = productGroups?.find((pg) => pg.pgId === pgIdNum)?.name ||"";
  const title = "Products - " + pgName;
  const productsUrlWithPgId = productsUrl + `/${pgId}`;
  const productsSWR = useSWR<ProductsResponse>(productsUrlWithPgId, fetchJSON);
  const products = productsSWR.data?.products;

  return (
...
```

3. Since the React-router tutorial used the loader pattern, I wanted to compare this solution to the SWR hook solution, and therefore I converted [product.tsx](https://github.com/karimarttila/js-node-ts-react/blob/main/frontend/src/routes/product.tsx) to use the React-router loader pattern.

```typescript
export async function productLoader({ params }: { params: productParams }): Promise<ProductType> {
  const { pgId, pId } = params;
  const productUrlWithIds = productUrl + `/${pgId}` + `/${pId}`;
  const product: ProductType = await axios
  .get(productUrlWithIds)
  .then((response) => {
    if (response.status === 200 && response.data.ret === "ok")
      return response.data.product;
  })
  .catch((error) => {
    console.log("error", error);
  });
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return product;  
}

export function Product() {
  const product: ProductType = useLoaderData() as ProductType;
  const title = "Product";
...
```

I like the SWR react-hook solution (#2) best. Compared to solution #1, the SWR react-hook is simpler. Compared to solution #3, the SWR solution is more straightforward and no need for the IoC (inversion of control) pattern makes the solution more readable. (I couldn't use SWR in the #3 solution since eslint complained that you cannot use a React hook in a non-React component - therefore using Axios again.)

But I'm not a frontend guru, so most probably there is some use case for the #3 solution.

### Typescript

Programming Typescript with its type system makes frontend programming easier. E.g., many bugs related to parameters and function return values are detected in the source code with a good type system. Since I created the backend using Javascript and the frontend using Typescript I can now compare the two programming languages. My conclusion is that you should use Typescript both in the backend and in the frontend.

### Vite

[Vite](https://vitejs.dev/) provides various services for frontend development, e.g., hot reloading in the browser, and so on. I'm not going to dive deeper into Vite, you can read more about it in the Vite documentation.

### Tailwind

See instructions in [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then I followed: [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite).

I have previously used [Bulma](https://bulma.io/), which is a CSS framework. Tailwind is a lower-level CSS library. If you need a coherent CSS framework with preconfigured components, go with Bulma. The project I'm about to start in one week uses Tailwind and therefore I wanted to have some Tailwind experience, and therefore I chose to use Tailwind in this learning project.

### JSX vs Hiccup

In the Clojure land I used [Hiccup](https://github.com/weavejester/hiccup) to represent HTML. [JSX](https://reactjs.org/docs/introducing-jsx.html) does the same thing in the Javascript / Typescript land. Now that I have used both Hiccup and JSX I can say that Hiccup provides a better developer experience. Hiccup is just Clojure data structures (maps and vectors) and manipulating Hiccup using Clojure is really effective and pleasant.

### Asynchronous Programming Model

The asynchronous programming model is something that you need to remember both on the backend and frontend sides. Example:

```typescript
export default function ProductGroups() {
  const productGroupsSWR = useSWR(url, fetchJSON);
  const productGroups = productGroupsSWR.data?.product_groups;
...
          <ProductGroupsTable productGroups={productGroups} />
...
```

The `productGroups` are not there when we try to mount the ProductGroupsTable. Therefore we need to check if the data has arrived:

```typescript
          {productGroups && (
            <ProductGroupsTable productGroups={productGroups} />
          )}
```

I was wondering about this and found out the problem using `console.log` in the `ProductGroupsTable` component.

### Using React Off-the-shelf Components

I could have used a simple [HTML Table](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table), but I wanted to experiment with some React Off-the-shelf component, and therefore I used with ProductGroups and Products the [TanStack Table](https://tanstack.com/table/v8) headless table component. Using the examples it was quite simple to implement the tables used in this demo app with Tanstack Table. Tanstack Table provides pagination, sorting, filtering etc out of the box.

Though, you could implement those features yourself. [Aarni Koskela](https://github.com/akx) demonstrated in the Koodiklinikka slack how he implemented pagination in a few minutes. (Quite an impressive video, you can watch it also on [Youtube](https://youtu.be/30ScPJZplXk).)

### Error Handling

I skipped error handling in this demo app. Possibly I implement later on some basic error handling.


## Deployment to AWS

TODO




