import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <div className="container py-6 px-4 md:px-6lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              className="w-16 h-16 object-cover rounded-full"
              src="/t91s.png"
              alt="Tu91 Store"
              priority
              quality={90}
              width={60}
              height={60}
            />
          </Link>
          <Nav />
          <div className="hidden flex items-center gap-4">
            <button>Login</button>
            <button>Register</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
