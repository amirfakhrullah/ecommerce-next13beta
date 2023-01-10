import NotFoundText from "../../NotFoundText";

const AboutSection = () => {
  return (
    <div className="min-h-[40vh] mx-auto max-w-6xl w-full">
      <div className="w-full border border-zinc-300 my-2 p-4">
        <p className="text-sm">
          This app is built for experimenting Next.js 13 Beta version. Not a
          real e-commerce site. Please don&apos;t insert any real credit card
          information during the checkout. Use the dummy{" "}
          <b>4242 4242 4242 4242</b>. I&apos;m using Stripe for handling
          payments
          <div className=""></div>
        </p>

        <div className="my-4" />

        <p className="text-sm">
          The goal for this project is not to make an e-commerce site with best
          UIs, or using the best e-commerce architecture/system design. The goal
          is mainly to test the new server components by Next.js 13 beta /app
          dir (and also to test the new tRPC version, because I&apos;ve been
          wanting to), and see how it goes! So far I&apos;m loving it!
        </p>

        <div className="my-4" />

        <p className="text-sm">
          This project is built in public. You can refer the codebase here:{" "}
          <a
            href="https://github.com/amirfakhrullah/ecommerce-next13beta"
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            ecommerce-next13beta
          </a>
        </p>

        <div className="my-4" />

        <p className="text-sm">
          For any issues, create a github issue in the repository link above.
        </p>
        <div className="my-4" />

        <p className="text-sm">
          If I got more time, I will make an admin section where they can upload
          products.
        </p>

        <div className="my-4" />

        <p className="text-sm">Thank you for visiting this site!</p>
      </div>
    </div>
  );
};

export default AboutSection;
