"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LogOut, Package, User, FileText } from "lucide-react"

interface UserData {
  email: string
  name: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }

    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </>
    )
  }

  // Mock order data
  const orders = [
    {
      id: "MIN-ABC123DEF",
      date: "2024-12-01",
      total: 289.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "MIN-XYZ789GHI",
      date: "2024-11-28",
      total: 159.99,
      status: "Shipped",
      items: 2,
    },
    {
      id: "MIN-PQR456STU",
      date: "2024-11-15",
      total: 439.99,
      status: "Processing",
      items: 5,
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Header */}
        <section className="border-b border-gray-200 py-8 md:py-12 bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">My Account</h1>
                <p className="text-gray-600">Welcome back, {user.name}!</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </section>

        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "orders", label: "Orders", icon: Package },
                  { id: "settings", label: "Settings", icon: FileText },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                      activeTab === id ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-lg p-8 shadow-soft">
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                      <p className="text-lg">{user.name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                      <p className="text-lg">{user.email}</p>
                    </div>

                    <button className="px-6 py-2 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-lg p-6 shadow-soft">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className="font-semibold text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.total}</p>
                            <p className="text-sm text-gray-600">{order.items} items</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                            <Link href={`/account/order/${order.id}`} className="text-blue-600 hover:underline">
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-white rounded-lg p-8 shadow-soft space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Settings</h2>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="font-medium">Receive email notifications</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="font-medium">Subscribe to newsletter</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="font-medium">Receive promotional offers</span>
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div>
                    <h3 className="font-bold mb-4 text-red-600">Danger Zone</h3>
                    <button className="px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
