import { siteConfig } from "@/config/constants";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Thông tin liên hệ</h1>
        <p className="text-sm text-gray-500">
          <article>
            <p className="flex items-start gap-2">
              <span className="font-bold text-black flex-0 text-nowrap">
                Địa chỉ:
              </span>{" "}
              {siteConfig.contact.address}
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-black flex-0 text-pretty">
                Điện thoại:
              </span>{" "}
              <Link href={`tel:${siteConfig.contact.phone}`}>
                {siteConfig.contact.phone}
              </Link>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-black flex-0 text-pretty">
                Email:
              </span>
              <Link href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </Link>
            </p>
          </article>
        </p>
      </div>
    </div>
  );
}
