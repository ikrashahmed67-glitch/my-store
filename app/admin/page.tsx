"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart3, Package, ShoppingCart, Users } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/admin/login")
    }
  }, [router])

  const stats = [
    {
      label: "Total Products",
      value: "48",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Orders",
      value: "1,234",
      icon: ShoppingCart,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Users",
      value: "856",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Revenue",
      value: "$45.2K",
      icon: BarChart3,
      color: "bg-orange-100 text-orange-600",
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

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-65px)]">
          <nav className="p-6 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg">
              <BarChart3 size={20} />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Package size={20} />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              Orders
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Users size={20} />
              Users
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-white rounded-lg p-6 shadow-soft">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg p-6 shadow-soft">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Order ID</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "#MIN-001", customer: "John Doe", amount: "$289.99", status: "Delivered" },
                    { id: "#MIN-002", customer: "Jane Smith", amount: "$159.99", status: "Shipped" },
                    { id: "#MIN-003", customer: "Bob Johnson", amount: "$439.99", status: "Processing" },
                  ].map((order) => (
                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                      <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                      <td className="px-4 py-3 text-gray-900">{order.amount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
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
