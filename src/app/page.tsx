import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="p-28 bg-red-900">
      <p className="text-2xl font-bold underline">Hello</p>
    </div>
  );
}
