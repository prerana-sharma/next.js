"use client";
import Header from "../components/header";
import "./global.scss";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "../components/footer";
import { MantineProvider } from "@mantine/core";
import ThemeStyle from "./themeStyle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-input-2/lib/style.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apolloConfig";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import RootStyleRegistry from "./emotion";
import Context from '../context/context'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

/* export const metadata: Metadata = {
  title: "You Choose Pets",
  description: "You Choose Pets",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();
  return (
    <html lang="en">
      <body
        className={plusJakartaSans.className}
        suppressHydrationWarning={true}
      >
        <ApolloProvider client={client}>
          <RootStyleRegistry>
            <Notifications
              position="bottom-right"
              limit={1}
              autoClose={5000}
              zIndex={1010}
            />
            <SessionProvider>
            <Context>
              <div id="app">
                {router !== "/login" &&
                  router !== "/register" &&
                  router !== "/forget-password" && <Header />}
                <main id="main">{children}</main>
                {router !== "/login" &&
                  router !== "/register" &&
                  router !== "/forget-password" && <Footer />}
              </div>
            </Context>
            </SessionProvider>
          </RootStyleRegistry>
        </ApolloProvider>
      </body>
    </html>
  );
}

/* export async function generateMetadata() {
  return {
    title: "You Choose Pets",
    description: "You Choose Pets",
  }
} */
