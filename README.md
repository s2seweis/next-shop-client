This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo

You can check [demo](https://next-typescript-pwa-starter.vercel.app/)

### Frontend

#### Libraries/Frameworks

- [React.js 18](https://reactjs.org/blog/2022/03/29/react-v18.html): Introduced in the blog post to highlight the features of React v18.0.
- [Next.js 13](https://nextjs.org/blog/next-13): Introduced in the blog post to highlight the features of Next.js 13.
- [Typescript 5](https://www.typescriptlang.org/): Official documentation for TypeScript, providing type safety and other features.
- Redux: State management library for managing complex application states.
- SCSS: Preprocessor scripting language that is compiled into CSS, providing more features and flexibility.
- [Next PWA 5](https://www.npmjs.com/package/next-pwa): Documentation for Next PWA, allowing for the creation of progressive web apps with Next.js.

#### Tools

- [Eslint 8](https://eslint.org/docs/user-guide/getting-started): Documentation for ESLint, a tool for identifying and reporting on patterns found in JavaScript code.
- [Prettier 3](https://prettier.io/docs/en/index.html): Documentation for Prettier, an opinionated code formatter to ensure consistent code formatting.
- [Husky 8](https://typicode.github.io/husky/#/): Documentation for Husky, a tool for Git hooks, used here for running ESLint before commits. (Currently removed, need to add new)
- [Lint Staged 14](https://github.com/okonet/lint-staged): Documentation for lint-staged, a tool for running linters on staged files.

#### Design Examples

- UI Design Examples: [mobivention Referenzen](https://mobivention.com/referenzen/)

### Backend

#### Technologies

- Express Server: Web server framework for Node.js.
- PostgreSQL: Open-source relational database management system.
- OAuth: Authentication framework used for authentication with GitHub, Google, and Facebook.
- Nodemailer: Node.js module for sending emails.
- Websocket: Provides a protocol for full-duplex communication channels over a single TCP connection for real-time monitoring of orders.
- Stripe: Payment processing platform with a customized payment experience.

#### Other Tools

- Docker: Documentation for Docker, a platform for developing, shipping, and running applications in containers.

These technologies and tools are combined to create a modern, efficient, and feature-rich web application with both frontend and backend components.https://mobivention.com/referenzen/

## Usage

This project using node >= 16.14 & yarn 1.22.19

### Installation

```bash
git clone https://github.com/danangekal/next-typescript-pwa-starter.git
yarn install
```

#### Development

```bash
yarn dev
```

#### Production

```bash
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

#### Docker Build

```bash
docker build -t next-typescript-pwa-starter .
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

- https://dev.to/ankusht2307/nextjs-typescript-setup-with-prettier-husky-3dih - Go and Check it out, There also a Next.js Starter!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Git Commands:

```bash
- git reset --hard HEAD
- git pull
```

Copyright © 2021 by Danang Eko Alfianto
