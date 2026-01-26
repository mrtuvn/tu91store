import { siteConfig } from "@/config/constants";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Thông tin liên hệ</h1>
        <div className="text-sm light:text-gray-500 dark:text-gray-400">
          <article>
            <p className="flex items-start gap-2">
              <span className="font-bold light:text-black dark:text-white flex-0 text-nowrap">
                Địa chỉ:
              </span>{" "}
              {siteConfig.contact.address}
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold light:text-black dark:text-white flex-0 text-pretty">
                Điện thoại:
              </span>{" "}
              <Link className="text-blue-500 underline" href={`tel:${siteConfig.contact.phoneSale}`}>
                {siteConfig.contact.phoneSale}
              </Link>
              - Tu
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold light:text-black dark:text-white flex-0 text-pretty">
                Email:
              </span>
              <Link href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </Link>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
