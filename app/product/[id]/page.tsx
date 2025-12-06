"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ImageGallery } from "@/components/image-gallery"
import { ReviewsSection } from "@/components/reviews-section"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/data/products"
import { Heart, ShoppingCart, Truck, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  text: string
  avatar: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === Number(params.id))
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const mockReviews: Review[] = [
    {
      id: 1,
      author: "John Smith",
      rating: 5,
      date: "2024-12-01",
      title: "Excellent quality!",
      text: "This product exceeded my expectations. The craftsmanship is outstanding and it arrived quickly.",
      avatar: "/man-avatar.png",
    },
    {
      id: 2,
      author: "Emma Davis",
      rating: 4,
      date: "2024-11-28",
      title: "Very good, minor issue",
      text: "Great product overall. One small detail could be improved, but for the price, it's excellent.",
      avatar: "/professional-woman-avatar.png",
    },
    {
      id: 3,
      author: "Michael Chen",
      rating: 5,
      date: "2024-11-25",
      title: "Worth every penny",
      text: "I've bought similar products before, and this is by far the best. Highly recommend!",
      avatar: "/diverse-woman-avatar.png",
    },
  ]

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Link href="/shop" className="text-blue-600 hover:underline">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ id: product.id, quantity })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Added to cart!")
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    if (isWishlisted) {
      const updated = wishlist.filter((id: number) => id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updated))
    } else {
      wishlist.push(product.id)
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200 py-4">
          <div className="container text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            {" / "}
            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>
            {" / "}
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>

        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Gallery */}
            <ImageGallery images={product.images} alt={product.name} />

            {/* Product Details */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-yellow-400" : "fill-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <p className="text-5xl font-bold mb-8">${product.price}</p>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-8">{product.description}</p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Truck className="mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white font-semibold rounded hover:bg-gray-900 transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`px-6 py-4 rounded border-2 font-semibold transition-colors ${
                    isWishlisted
                      ? "bg-red-100 border-red-600 text-red-600"
                      : "border-gray-300 text-gray-600 hover:border-black"
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Stock Status */}
              <div className="text-sm text-gray-600 pb-8 border-b border-gray-200">
                <p>✓ In stock and ready to ship</p>
              </div>

              {/* Additional Info */}
              <div className="mt-8 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">SKU:</p>
                  <p className="text-gray-600">PROD-{product.id.toString().padStart(4, "0")}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Category:</p>
                  <p className="text-gray-600">{product.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <ReviewsSection reviews={mockReviews} averageRating={product.rating} />

          {/* Related Products */}
          <section className="py-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
