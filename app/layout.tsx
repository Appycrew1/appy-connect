import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appy Link – Linking movers with suppliers',
  description: 'Directory of suppliers and tools for moving companies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <img src="/favicon.ico" alt="" className="h-6 w-6 rounded" />
              <span>Appy Link</span>
            </a>
            <nav className="flex gap-4 text-sm">
              <a href="/providers" className="hover:underline">Providers</a>
              <a href="/submit" className="hover:underline">Submit</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
