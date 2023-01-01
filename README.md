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

- [Vercel](https://vercel.com/)
- [Railway](https://railway.app/)

## Setting up locally

- Clone or fork this repository
- To clone

```bash
git clone https://github.com/amirfakhrullah/ecommerce-next13beta.git
```

- Create and set up the `.env` file, refer to `.env.sample` for the required keys
- Install the dependencies

```bash
npm i
```

- Push and synchronize the Prisma schema to the database

```bash
npx prisma db push
```

- Run locally

```bash
npm run dev
```

## License

License under the [MIT License](./LICENSE)
