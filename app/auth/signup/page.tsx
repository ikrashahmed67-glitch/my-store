"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Save user to localStorage
    const user = { email: formData.email, name: formData.name }
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("isLoggedIn", "true")

    // Redirect to account
    router.push("/account")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12">
        <div className="container max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-soft">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-600 mb-8">Join us and start shopping</p>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-4 mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors mt-6"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-black font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <p className="text-center text-gray-600">
                <Link href="/" className="text-black font-semibold hover:underline">
                  Back to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
