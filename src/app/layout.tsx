import { ProviderWrapper } from "@/components/ProviderWrapper";
import React from "react";
import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="wrapper">
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
