import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
})

export const metadata = {
  title: "LapTech - Laptops y Tecnología",
  description: "Tienda online de laptops, notebooks y tecnología al mejor precio."
};

export default function RootLayout({ children }) {
  let flag = false
  setTimeout(()=> {
    flag = true
  }, 3000)

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <ClientLayout children={children}/>
      </body>
    </html>
  );
}
