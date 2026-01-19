import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/global.css";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Script from "next/script";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tu91 Store",
  description:
    "Tu91 Store là thương hiệu nhập khẩu và cung cấp cho khách hàng những sản phẩm chăm sóc sức khỏe chất lượng cao đến từ Hàn Quốc, với đội ngũ nhân sự chuyên nghiệp, và tận tâm.",
  keywords: ["ginseng", "phone accessories", "camera ip", "Tu91 Store"],
  authors: [{ name: "Tu91 Store" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tu91 Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = "360680370";

  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} font-body antialiased`}>
        <Script
          id="facebook-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
            `,
          }}
        />

        {/* Track Page Views (Initial Load) */}
        <Script
          id="facebook-pixel-pageview"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'PageView');
            `,
          }}
        />

        <Header />
        <main className="min-h-dvh">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
