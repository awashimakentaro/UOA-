"use client"

import { useState } from "react"
import Header from "../components/Header"
import ReviewList from "../components/ReviewList"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapPinIcon, AdjustmentsHorizontalIcon, MapIcon } from "@heroicons/react/24/outline"

export default function ReviewsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("新着順")

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* 検索条件バー */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-3 divide-x">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-center py-4 hover:bg-gray-50 w-full">
                  <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
                  <span>{sortBy}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("新着順")}>新着順</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("評価の高い順")}>評価の高い順</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("評価の低い順")}>評価の低い順</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              className="flex items-center justify-center py-4 hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-600" />
              <span>条件変更</span>
            </button>
            <button className="flex items-center justify-center py-4 hover:bg-gray-50">
              <MapIcon className="h-5 w-5 mr-2 text-gray-600" />
              <span>地図表示</span>
            </button>
          </div>
          {isFilterOpen && (
            <div className="p-4 border-t">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    エリア
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["八戸駅", "陸奥白浜駅", "大久喜駅"].map((area) => (
                      <Button
                        key={area}
                        variant={selectedAreas.includes(area) ? "default" : "outline"}
                        onClick={() => {
                          if (selectedAreas.includes(area)) {
                            setSelectedAreas(selectedAreas.filter((a) => a !== area))
                          } else {
                            setSelectedAreas([...selectedAreas, area])
                          }
                        }}
                      >
                        {area}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">詳細条件</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>キャッシュバック対象物件</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsFilterOpen(false)}>条件を適用</Button>
              </div>
            </div>
          )}
        </div>

        {/* レビューリスト */}
        <div>
          <h1 className="text-3xl font-bold mb-6">すべての口コミ</h1>
          <ReviewList />
        </div>
      </main>
    </div>
  )
}

