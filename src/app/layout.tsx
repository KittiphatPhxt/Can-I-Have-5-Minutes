import "./globals.css";
import { AudioProvider } from "../context/AudioContext";
import AmbientDust from "../components/AmbientDust";

export const metadata = {
  title: "Can I Have 5 Minutes",
  description: "Spend 5 minutes with yourself.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=Noto+Serif+Thai:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-[#e8e8e8] font-sans antialiased selection:bg-gold selection:text-black">
        {/* ✨ ละอองประกายสีทองในฉากหลัง */}
        <AmbientDust />

        {/* 🔊 หุ้มด้วย AudioProvider เพื่อให้เพลงเล่นต่อเนื่องทุกหน้า */}
        <AudioProvider>
          <main className="min-h-screen min-h-[100dvh] flex flex-col justify-center relative overflow-hidden bg-bg">
            {children}
          </main>
        </AudioProvider>
      </body>
    </html>
  );
}