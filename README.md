# Checks

An e-commerce site for Nike sneakers built using Next.js 13 Beta

- This project is still in development
- This is made for experimenting and learning purposes. Not a real e-commerce site

## Tech-stacks (Currently)

- [Next.js 13 Beta](https://beta.nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Next-Auth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)

## Deployments/Hosting

- Next.js: [Vercel](https://vercel.com/)
- Database: [Railway](https://railway.app/)
- Image hosting: [AWS S3](https://aws.amazon.com/s3/)

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

- Push and synchronize the prisma schema to the database:

```bash
npx prisma db push
```

- Run locally:

```bash
npm run dev
```

## License

License under the [MIT License](./LICENSE)
