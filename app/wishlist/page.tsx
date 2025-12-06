"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/data/products"

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<number[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setWishlistIds(saved)
  }, [])

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="border-b border-gray-200 py-8 md:py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Wishlist</h1>
          </div>
        </section>

        <div className="container py-12">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-8">Save your favorite products to your wishlist</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-8">You have {wishlistProducts.length} items in your wishlist</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
