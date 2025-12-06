"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  images: string[]
  bestseller?: boolean
}

export function ProductCard({ id, name, price, rating, reviews, images, bestseller }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (isWishlisted) {
      const updated = wishlist.filter((item: number) => item !== id)
      localStorage.setItem("wishlist", JSON.stringify(updated))
    } else {
      wishlist.push(id)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }

  return (
    <div className="group">
      <div className="relative bg-gray-100 aspect-square rounded-lg overflow-hidden mb-4">
        {bestseller && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
            BESTSELLER
          </div>
        )}
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isWishlisted ? "bg-red-100 text-red-600" : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <Link href={`/product/${id}`}>
        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors">{name}</h3>
      </Link>

      <div className="flex items-center gap-2 my-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i < Math.round(rating) ? "fill-black" : "fill-gray-300"} />
          ))}
        </div>
        <span className="text-sm text-gray-600">({reviews})</span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-gray-900">${price}</p>
        <Link href={`/product/${id}`} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
          View
        </Link>
      </div>
    </div>
  )
}
