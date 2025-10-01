export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="rounded-3xl border p-8 bg-white">
        <h1 className="text-3xl font-bold">Appy Link</h1>
        <p className="mt-2 text-gray-600">Linking movers with suppliers.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/providers" className="rounded-2xl border px-4 py-2">Browse Providers</a>
          <a href="/submit" className="rounded-2xl border px-4 py-2">Submit a Listing</a>
          <a href="/contact" className="rounded-2xl border px-4 py-2">Contact</a>
          <a href="/admin" className="rounded-2xl border px-4 py-2">Admin</a>
        </div>
      </section>
    </main>
  );
}
