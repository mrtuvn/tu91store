import { siteConfig } from "@/config/constants";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container px-4 md:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
