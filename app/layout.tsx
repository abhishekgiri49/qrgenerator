import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster, toast } from 'sonner';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free QR Code Generator | Create Custom QR Codes Instantly",
  description:
    "Generate free QR codes for URLs, text, emails, and more. No registration required. Customize colors and download in high resolution.",
  keywords: [
    "free qr code generator",
    "qr code creator",
    "custom qr code",
    "qr code online",
    "qr code download",
  ],
  authors: [{ name: "Your Name", url: "https://qrgenerator.giriabhishek.com.np" }],
  openGraph: {
    title: "Free QR Code Generator | Create Custom QR Codes Instantly",
    description:
      "Generate free QR codes for URLs, text, emails, and more. No registration required.",
    url: "https://qrgenerator.giriabhishek.com.np",
    siteName: "Free QR Code Generator",
    images: [
      {
        url: "https://qrgenerator.giriabhishek.com.np/qrcode-icon.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator | Create Custom QR Codes Instantly",
    description:
      "Generate free QR codes for URLs, text, emails, and more. No registration required.",
    images: ["https://qrgenerator.giriabhishek.com.np/qrcode-icon.png"],
  },
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* You can add additional meta tags here if needed */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
