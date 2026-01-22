'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-10 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex gap-2">
          <Link className="bg-black text-white px-4 py-2 rounded-full" href="/todos">Todos Page</Link>
          <Link className="bg-black text-white px-4 py-2 rounded-full" href="/posts">Posts Page</Link>
        </div>
      </main>
    </div>
  );
}
