import type { Metadata } from "next";
import Script from 'next/script';
import Roboto from 'next/font/local';
import "./globals.css";
import HeaderWrapper from "@/components/Layout/HeaderWrapper";
import Footer from "@/components/Layout/Footer"


export const metadata: Metadata = {
  title: "Купить квартиры в Великом Новгороде и области в новостройках от застройщика",
  description: "Новгородская строительная компания «Глория», действуя как генеральный подрядчик, на протяжении 20 лет имеет репутацию надежного делового застройщика ... квартиры Великий Новгород. строительство и продажа квартир. отдел продаж. +7(8162) 623-800.",
};

const roboto = Roboto({
  src: [
    {
      path: "./fonts/Roboto/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Roboto/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Roboto/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
      <Script
  src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`}
  strategy="afterInteractive"
/>
<HeaderWrapper />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
