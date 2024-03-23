import type { Metadata } from "next";
import { Pacifico, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";

 const inter = Inter({ subsets: ["latin"], weight: ["900"] });

 const Rubik = Pacifico({
  subsets: ["latin"],
  weight:["400"]
});

 const space_Grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight:["700"]
});

 const metadata: Metadata = {
  title: "Blog",
  description: "Dev.to Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className + " inter-font container min-h-screen max-w-screen-xl mx-auto"}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
