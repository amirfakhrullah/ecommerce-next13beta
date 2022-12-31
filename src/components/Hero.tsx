"use client";

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="md:px-10 md:py-20 p-2 flex md:flex-row flex-col-reverse items-center justify-center">
      <div className="p-11">
        <h2 className="text-4xl font-black mb-2">Checks over stripes.</h2>
        <p>A marketplace for copping heat Nike sneakers 🔥</p>
        <p>(not legit lol, made it for fun)</p>
      </div>
      <div>
        <Image
          src="/images/thumbnail.png"
          alt="thumbnail"
          height={250}
          width={250}
        />
      </div>
    </div>
  );
};

export default Hero;
