import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Header from "./components/Header"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-5 pt-24 flex flex-col items-center">
        {/* ロゴとタイトル */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">
            <span className="text-6xl md:text-3xl">会津</span>の賃貸の
            <span className="text-5xl md:text-7xl font-bold tracking-wider">Real</span>
          </h1>
          <div className="font-serif text-4xl md:text-2xl tracking-widest mb-8">
            <div>IoA</div>
            <div className="text-sm text-gray-600">Information Of Aizu apartment</div>
          </div>
        </div>
    
        {/* 口コミ投稿ボタン */}
        <Link
          href="/write-review"
          className="inline-block mb-8 px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 font-serif tracking-wider"
        >
          口コミを投稿する
        </Link>

        {/* 検索フォーム */}
        <div className="w-full max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="物件名・エリアで検索"
              className="w-full py-3 px-4 pr-12 border-2 border-black rounded-none focus:outline-none font-serif"
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-4">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

