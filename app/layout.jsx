import React from "react";
import "./globals.css";
import { Alexandria } from "next/font/google";
import { CartItemsProvider } from "../src/shared/contexts/CartItemsContext";
import { LanguageProvider } from "../src/shared/language-provider";
import FloatingWhatsApp from "../src/shared/components/layout/floating-whatsapp";
import CartSidebar from "../src/shared/components/layout/cart";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Health Nest | شريكك لحياة صحية",
  description:
    "Health Nest - شريكك لحياة صحية. وجبات صحية طازة محضرة بعناية ومكونات مختارة بحب. اطلب دلوقتي عن طريق واتساب.",
  keywords:
    "أكل صحي، healthy food، مصر، وجبات صحية، Health Nest دايت، شريكك لحياة صحية",
};

export const viewport = {
  themeColor: "#04462B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={alexandria.className}>
      <body className="antialiased">
        <LanguageProvider>
          <CartItemsProvider>
            {children}
            <CartSidebar />
            <FloatingWhatsApp />
          </CartItemsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
