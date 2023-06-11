import "./globals.css";
import { Ubuntu, Plus_Jakarta_Sans } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "Quiz App",
  description: "Answer questions on time and get points",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${plusJakartaSans.variable} font-ubuntu`}
      >
        {children}
      </body>
    </html>
  );
}
