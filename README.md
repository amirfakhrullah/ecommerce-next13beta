# Checks

An e-commerce site for Nike sneakers built with the new Next.js 13 Beta (and other packages like tRPC, Next-Auth, Prisma,...)

> **Warning**
> Not a real e-commerce site. Built for experimenting and learning purposes.

## Demo

![progress1](https://user-images.githubusercontent.com/73758525/212482738-8eb76e3b-2cf8-42f6-86ee-8b0c9b4b63eb.png)

![progress2](https://user-images.githubusercontent.com/73758525/212482779-0a1daf72-3758-4ef4-bf89-f3695034bd82.png)

![progress3](https://user-images.githubusercontent.com/73758525/212482786-373d6b13-c0e9-40fe-beec-7b89b84c097a.png)

![progress4](https://user-images.githubusercontent.com/73758525/212482792-ac440448-d848-47f1-a746-f260ea63ec1a.png)

## About

- For testing and experimenting all the new features in Next.js 13 Beta (`/app` dir, server components and everything new)
- Inspired by [Taxonomy](https://github.com/shadcn/taxonomy) built by [@shadcn](https://twitter.com/shadcn)
- Haven't built an e-commerce site, so I'm challenging myself to build one!
- Building this in public. You can follow the progress/updates on [@amirfkrlh](https://twitter.com/amirfkrlh)

## Tech-stacks

- [Next.js 13 Beta](https://beta.nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Material-Tailwind](https://www.material-tailwind.com/)
- [tRPC](https://trpc.io/)
- [Next-Auth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)

## Deployments/Hosting

- Next.js: [Vercel](https://vercel.com/)
- Database: [Railway](https://railway.app/)
- Image hosting: [AWS S3](https://aws.amazon.com/s3/)

## Payment

- [Stripe](https://stripe.com/)

## Cron Job

- GitHub Action

## Setting up locally

- Clone or fork this repository
- To clone:

```bash
git clone https://github.com/amirfakhrullah/ecommerce-next13beta.git
```

- Create and set up the `.env` file, refer to `.env.sample` for the required keys
- Install the dependencies and generate prisma client (postinstall):

```bash
npm i
```

- Push and synchronize the prisma schema to the database (make sure you have prisma cli installed):

```bash
npx prisma db push
```

- Seed initial data:

```bash
npx prisma db seed
```

- Run locally:

```bash
npm run dev
```

## License

License under the [MIT License](./LICENSE)
