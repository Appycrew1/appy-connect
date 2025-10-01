import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appy Link – Linking movers with suppliers',
  description: 'Directory of suppliers and tools for moving companies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
