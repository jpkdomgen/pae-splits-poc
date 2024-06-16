import Link from "next/link";

export default function Home() {
  console.log("Home Page render.......");
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Splits POC</h1>
      <Link href="/todos">Show My Todos</Link>
    </main>
  );
}
