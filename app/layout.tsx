import { Metadata } from "next";
import { fontBase } from "@/app/libs/fonts";
import "react-multi-carousel/lib/styles.css";

import "@/app/globals.css";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import BackToTop from "@/app/components/Commons/BackToTop";
import Messages from "@/app/components/Commons/Messages";

import LogoImage from "@/public/images/logo.png";

export const metadata: Metadata = {
  icons: {
    icon: `${LogoImage}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontBase.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <Messages />
      </body>
    </html>
  );
}
