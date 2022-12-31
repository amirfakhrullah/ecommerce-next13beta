"use client";

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="md:px-10 md:py-20 p-2 flex md:flex-row flex-col-reverse items-center justify-center">
      <div className="md:p-8 p-5 md:flex-[0.8]">
        <h2 className="text-4xl font-black mb-2 text-red-800">
          Checks over stripes.
        </h2>
        <p className="font-medium mb-2">
          Marketplace for copping heat Nike sneakers 🔥
        </p>
        <p className="text-zinc-500 text-[16px]">
          (Not legit. This is a site built with Next.js 13 Beta for
          experimenting and learning purposes)
        </p>
      </div>
      <div>
        <Image
          src="/images/thumbnail.png"
          alt="thumbnail"
          priority={true}
          height={200}
          width={200}
          className="w-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
