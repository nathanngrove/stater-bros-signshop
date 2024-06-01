import Link from "next/link";
import Viewer from "~/components/Viewer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Viewer />
    </main>
  );
}
