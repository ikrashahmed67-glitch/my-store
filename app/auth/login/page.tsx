"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mock authentication
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    // Save user to localStorage
    const user = { email, name: email.split("@")[0] }
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("isLoggedIn", "true")

    // Redirect to account page
    router.push("/account")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12">
        <div className="container max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-soft">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-8">Sign in to your Minimal account</p>

            {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-4 mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors mt-6"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-black font-semibold hover:underline">
                  Sign up
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

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Demo Account:</strong> Use any email to log in (e.g., demo@example.com)
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
