import Link from "next/link"
import Image from "next/image"
import { ListBulletIcon, HeartIcon, LockClosedIcon, PencilIcon } from "@heroicons/react/24/outline"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/images/uoa.jpg" alt="UoAハッカソンロゴ" width={100} height={40} className="object-contain" />
          <span className="ml-2 text-xl font-bold">UoAハッカソン</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/reviews" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <ListBulletIcon className="h-6 w-6" />
                <span className="text-xs mt-1">一覧表示</span>
              </Link>
            </li>
            <li>
              <Link href="/liked-reviews" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <HeartIcon className="h-6 w-6" />
                <span className="text-xs mt-1">いいね</span>
              </Link>
            </li>
            <li>
              <Link href="/write-review" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <PencilIcon className="h-6 w-6" />
                <span className="text-xs mt-1">口コミを書く</span>
              </Link>
            </li>
            <li>
              <button className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <LockClosedIcon className="h-6 w-6" />
                <span className="text-xs mt-1">ログイン</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

