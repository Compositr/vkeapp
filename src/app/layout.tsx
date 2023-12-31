import ClientSession from "@/components/client/ClientSession";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VKE",
  description:
    "VKE is a microblogging social media platform for everyone! Sign up now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientSession>
        <body>{children}</body>
      </ClientSession>
    </html>
  );
}
