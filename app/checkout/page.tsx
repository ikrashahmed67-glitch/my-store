"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronRight } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).some((v) => !v)) {
      alert("Please fill in all fields")
      return
    }
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Clear cart
    localStorage.setItem("cart", "[]")
    setStep("confirmation")
  }

  if (step === "confirmation") {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="container py-20 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 text-lg mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 mb-8">Order confirmation has been sent to {formData.email}</p>

            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto mb-8">
              <p className="text-sm text-gray-600 mb-2">ORDER NUMBER</p>
              <p className="text-2xl font-bold mb-6">#MIN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-sm text-gray-600">Your order will be shipped within 1-2 business days.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account/orders"
                className="px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
              >
                View Order
              </Link>
              <Link
                href="/shop"
                className="px-6 py-3 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-2xl">
          {/* Steps */}
          <div className="flex justify-between mb-12">
            {["Shipping", "Payment", "Confirmation"].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    (step === "shipping" && i <= 0) ||
                    (step === "payment" && i <= 1) ||
                    (step === "confirmation" && i <= 2)
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                <p className={`ml-3 font-medium ${step === s.toLowerCase() ? "text-black" : "text-gray-600"}`}>{s}</p>
                {i < 2 && <ChevronRight className="ml-6 text-gray-300" />}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg p-8">
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit}>
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State/Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                    >
                      <option value="">Select country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit}>
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  <label className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 mr-3"
                    />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </label>
                  <label className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-black transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="w-4 h-4 mr-3"
                    />
                    <span className="font-semibold">Cash on Delivery</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="bg-gray-50 p-4 rounded mb-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 1234 5678 9010"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
                    <p className="text-sm text-blue-800">You will pay upon delivery. Please have exact change ready.</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="flex-1 py-3 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
