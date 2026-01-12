import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">Giới thiệu</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
