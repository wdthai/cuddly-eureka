import { Inter, Anton, UnifrakturMaguntia, Montserrat } from "next/font/google";
import "./globals.css";

const custom = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-custom",
});

const custom2 = UnifrakturMaguntia({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-custom2",
});

const custom3 = Montserrat({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-custom3",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Gallery",
  description: "Picture gallery",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${custom.variable} ${custom2.variable} ${custom3.variable}`}
    >
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
