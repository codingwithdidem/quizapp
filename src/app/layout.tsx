import "./globals.css";
import { Ubuntu, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

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
        <Script strategy="afterInteractive" id="100vh-fix">
          {`
              var customViewportCorrectionVariable = 'vh';

              function setViewportProperty(doc) {
                var prevClientHeight;
                var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
                function handleResize() {
                  var clientHeight = doc.clientHeight;
                  if (clientHeight === prevClientHeight) return;
                  requestAnimationFrame(function updateViewportHeight(){
                    doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
                    prevClientHeight = clientHeight;
                  });
                }
                handleResize();
                return handleResize;
              }
              window.addEventListener('resize', setViewportProperty(document.documentElement));
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
