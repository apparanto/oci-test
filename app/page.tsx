import Punchout from "./components/Punchout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="mb-8 text-2xl">Parts Portal OCI Punchout Tester</h2>
      <Punchout />
    </main>
  );
}
