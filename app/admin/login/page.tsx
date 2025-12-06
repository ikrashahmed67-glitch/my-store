"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mock admin authentication
    if (email === "admin@minimal.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true")
      router.push("/admin")
    } else {
      setError("Invalid admin credentials")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg p-8 shadow-soft">
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-8">Access the admin dashboard</p>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-4 mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black outline-none"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors mt-6"
            >
              Login to Admin
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong>
              <br />
              Email: admin@minimal.com
              <br />
              Password: admin123
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-black font-semibold hover:underline">
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
