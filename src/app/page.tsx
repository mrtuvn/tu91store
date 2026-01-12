import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full py-14 px-10 bg-white dark:bg-black">
        <div className="container flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Chúng tôi đang xây dựng trang web này.
          </h1>
        </div>
      </main>
    </div>
  );
}
