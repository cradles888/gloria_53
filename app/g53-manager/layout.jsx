import localFont from "next/font/local";

const syne = localFont({
  src: [
    {
      path: "../fonts/Syne/Syne-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Syne/Syne-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Syne/Syne-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-syne",
  display: "swap",
});

export default function AdminLayout({ children }) {
  return <div className={syne.variable}>{children}</div>;
}
