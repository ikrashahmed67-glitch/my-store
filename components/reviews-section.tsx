"use client"

import { useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  text: string
  avatar: string
}

interface ReviewsSectionProps {
  reviews: Review[]
  averageRating: number
}

export function ReviewsSection({ reviews, averageRating }: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<"helpful" | "recent" | "highest">("recent")

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === "highest") return b.rating - a.rating
    return 0
  })

  return (
    <section className="py-12 border-t border-gray-200">
      <h3 className="text-2xl font-bold mb-8">Customer Reviews</h3>

      {/* Rating Summary */}
      <div className="bg-gray-50 p-8 rounded-lg mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div>
            <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(averageRating) ? "fill-yellow-400" : "fill-gray-300"}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 pl-8">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length
              const percentage = (count / reviews.length) * 100
              return (
                <div key={rating} className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600 w-12">{rating} star</span>
                  <div className="flex-1 bg-gray-300 rounded-full h-2">
                    <div className="bg-black h-full rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-12">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sort and Write Review */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 rounded cursor-pointer focus:border-black outline-none"
        >
          <option value="recent">Sort by: Most Recent</option>
          <option value="highest">Sort by: Highest Rating</option>
        </select>

        <button className="px-6 py-2 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors">
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-600">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400" : "fill-gray-300"} />
                ))}
              </div>
            </div>

            {/* Review Content */}
            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.text}</p>

            {/* Helpful Button */}
            <button className="text-sm font-medium text-gray-600 hover:text-black transition-colors">👍 Helpful</button>
          </div>
        ))}
      </div>
    </section>
  )
}
