"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ListBulletIcon,
  HeartIcon,
  LockClosedIcon,
  PencilIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleWriteReviewClick = () => {
    if (!session) {
      signIn("google", { callbackUrl: "/write-review" })
    } else {
      router.push("/write-review")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center font-serif">
        <Link href="/" className="flex items-center">
          <Image src="/images/uoa.jpg" alt="UoAハッカソンロゴ" width={100} height={40} className="object-contain" />
          <span className="ml-2 text-3xl font-bold tracking-widest text-gray-800 relative">
            IOL
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
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
              <Link href="/q-and-a" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Q&A</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleWriteReviewClick}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800"
              >
                <PencilIcon className="h-6 w-6" />
                <span className="text-xs mt-1">口コミを書く</span>
              </button>
            </li>
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                >
                  <Image
                    src={session.user?.image || "/placeholder.svg"}
                    alt="プロフィール"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-xs mt-1">ログアウト</span>
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                >
                  <LockClosedIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">ログイン</span>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

