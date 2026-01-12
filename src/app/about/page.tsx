import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="container">
        <h1 className="text-2xl font-bold">AboutPage</h1>
        <p className="text-sm text-gray-500">
          <article></article>
          <p>Địa chỉ: 90B Ngõ 92 Mai Động, TP Hà Nội </p>
          <p>
            Điện thoại: <Link href="tel:0936536599">0936536599</Link>
          </p>
          <p>
            Email:{" "}
            <Link href="mailto:tuna9x.it@gmail.com">tuna9x.it@gmail.com</Link>
          </p>
        </p>
      </div>
    </div>
  );
}
