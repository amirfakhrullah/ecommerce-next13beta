import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="sm:mx-3 mx-1 px-2 sm:py-5 py-4 border-t border-zinc-300 flex md:flex-row md:justify-around flex-col gap-2">
      <div className="sm:p-5">
        <h1 className="text-2xl text-red-800 font-black mb-3">Checks!</h1>
        <p className="text-[14px]">
          Built by{" "}
          <Link
            className="underline"
            target="_blank"
            href="https://twitter.com/amirfkrlh"
          >
            @amirfkrlh
          </Link>{" "}
          (2023). See source code{" "}
          <Link
            className="underline"
            target="_blank"
            href="https://github.com/amirfakhrullah/ecommerce-next13beta"
          >
            here.
          </Link>
        </p>
        <p className="text-[14px]">
          Powered by{" "}
          <Link
            className="underline"
            href="https://vercel.com/"
            target="_blank"
          >
            Vercel
          </Link>
          ,{" "}
          <Link
            className="underline"
            href="https://railway.app/"
            target="_blank"
          >
            Railway
          </Link>{" "}
          &{" "}
          <Link
            className="underline"
            href="https://aws.amazon.com/"
            target="_blank"
          >
            AWS S3
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-col justify-end sm:p-5">
        <p className="text-[14px]">This is not a real e-commerce site.</p>
      </div>
    </div>
  );
};

export default Footer;
