import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Appy Link</h1>
      <p className="mt-2 text-gray-600">Linking movers with suppliers.</p>

      <nav className="mt-6 grid gap-3">
        <Link href="/providers" className="underline">Browse Providers</Link>
        <Link href="/submit" className="underline">Submit a Listing</Link>
        <Link href="/contact" className="underline">Contact</Link>
        <Link href="/admin" className="underline">Admin</Link>
      </nav>
    </main>
  );
}
