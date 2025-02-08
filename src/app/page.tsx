import Image from "next/image"
import Link from "next/link"
import { MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Header from "./components/Header"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* メインビジュアル */}
      <main className="relative min-h-screen pt-16">
        <div className="absolute inset-0">
          <Image src="/images/homeBack.jpg" alt="アパートの外観" fill className="object-cover brightness-75" priority />
        </div>

        {/* メインコンテンツ */}
        <div className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
          <div className="text-center text-white space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">早速物件の口コミを見る</h1>
            <p className="text-lg md:text-xl">生の声を聞けちゃうよん</p>

            {/* 検索フォーム */}
            <div className="max-w-2xl mx-auto w-full">
              <div className="bg-white rounded-lg shadow-lg p-1">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="物件名で検索"
                    className="flex-1 px-4 py-3 text-gray-800 text-lg focus:outline-none rounded-l-lg"
                  />
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    検索
                  </button>
                </div>
              </div>
            </div>

            {/* 口コミ投稿ボタン */}
            <div className="mt-4">
              <Link
                href="/write-review"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <PencilSquareIcon className="h-5 w-5 mr-2" />
                口コミを投稿する
              </Link>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  )
}

