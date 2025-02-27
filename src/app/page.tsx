import Header from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Header />
      <p>{`An on-chain quest to find another earth, before it's too late! 🧑‍🚀🚀`}</p>
    </main>
  );
}
