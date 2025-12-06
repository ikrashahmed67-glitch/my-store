"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminOrdersPage() {
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/admin/login")
    }
  }, [router])

  const orders = [
    {
      id: "#MIN-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$289.99",
      status: "Delivered",
      date: "2024-12-01",
    },
    {
      id: "#MIN-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "$159.99",
      status: "Shipped",
      date: "2024-12-02",
    },
    {
      id: "#MIN-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: "$439.99",
      status: "Processing",
      date: "2024-12-03",
    },
    {
      id: "#MIN-004",
      customer: "Alice Williams",
      email: "alice@example.com",
      amount: "$199.99",
      status: "Pending",
      date: "2024-12-04",
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin")
              router.push("/")
            }}
            className="px-4 py-2 text-gray-600 hover:text-black transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-65px)]">
          <nav className="p-6 space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg">
              Orders
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Orders Management</h2>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Order ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Customer</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 text-gray-600">{order.email}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
