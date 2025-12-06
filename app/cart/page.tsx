"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Trash2, Plus, Minus, Gift } from "lucide-react"
import { PRODUCTS } from "@/lib/data/products"

interface CartItem {
  id: number
  quantity: number
}

const SHIPPING_RATES = {
  standard: { name: "Standard (5-7 days)", cost: 10 },
  express: { name: "Express (2-3 days)", cost: 25 },
  overnight: { name: "Overnight (Next Day)", cost: 50 },
}

const COUPON_CODES: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  WELCOME: 0.15,
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express" | "overnight">("standard")
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(savedCart)
    setIsLoading(false)
  }, [])

  // Get product details
  const cartProducts = cartItems
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id)
      return product ? { ...product, cartQuantity: item.quantity } : null
    })
    .filter(Boolean)

  // Calculate totals
  const subtotal = cartProducts.reduce((sum, product) => sum + (product?.price || 0) * (product?.cartQuantity || 0), 0)
  const discountPercent = appliedCoupon ? COUPON_CODES[appliedCoupon] || 0 : 0
  const discountAmount = subtotal * discountPercent
  const shippingCost = subtotal >= 100 ? 0 : SHIPPING_RATES[shippingMethod].cost
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + tax + shippingCost

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    const updated = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  // Remove item
  const removeItem = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id)
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  // Apply coupon
  const applyCoupon = () => {
    if (COUPON_CODES[couponCode.toUpperCase()]) {
      setAppliedCoupon(couponCode.toUpperCase())
      setCouponCode("")
    } else {
      alert("Invalid coupon code")
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen container py-12">
          <p>Loading...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="container py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some premium products to get started!</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Header */}
        <section className="border-b border-gray-200 py-8 md:py-12">
          <div className="container">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
        </section>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartProducts.map(
                  (product) =>
                    product && (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex gap-4">
                        {/* Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">${product.price}</p>

                          {/* Quantity */}
                          <div className="flex items-center border border-gray-300 rounded w-fit">
                            <button
                              onClick={() => updateQuantity(product.id, product.cartQuantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300">{product.cartQuantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, product.cartQuantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="text-right">
                          <p className="font-bold text-gray-900 mb-4">
                            ${(product.price * product.cartQuantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ),
                )}
              </div>

              {/* Continue Shopping */}
              <Link href="/shop" className="text-blue-600 hover:underline mt-6 inline-block">
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Gift size={16} />
                      <span>{appliedCoupon} applied</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 mt-2">Try: SAVE10, SAVE20, WELCOME</p>
                </div>

                <hr className="mb-4" />

                {/* Shipping Method */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Shipping Method</h3>
                  <div className="space-y-2">
                    {Object.entries(SHIPPING_RATES).map(([key, { name, cost }]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={shippingMethod === key}
                          onChange={() => setShippingMethod(key as any)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{name}</p>
                          <p
                            className={`text-sm ${subtotal >= 100 && key === "standard" ? "text-green-600" : "text-gray-600"}`}
                          >
                            {subtotal >= 100 && key === "standard" ? "FREE" : `$${cost}`}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {subtotal >= 100 && (
                    <p className="text-sm text-green-600 mt-2">Free standard shipping on orders over $100!</p>
                  )}
                </div>

                <hr className="mb-4" />

                {/* Totals */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({(discountPercent * 100).toFixed(0)}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr className="mb-6" />

                <div className="flex justify-between mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full py-3 bg-black text-white text-center font-medium rounded hover:bg-gray-900 transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>

                <button className="w-full py-3 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
