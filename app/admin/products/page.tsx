"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PRODUCTS } from "@/lib/data/products"
import { Edit, Trash2, Plus } from "lucide-react"

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState(PRODUCTS)

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/admin/login")
    }
  }, [router])

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

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
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg">
              <Plus size={20} />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Orders
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Products</h2>
            <button className="flex items-center gap-2 px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors">
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Product</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Stock</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Rating</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{product.name}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
                      <td className="px-6 py-4 text-gray-600">128</td>
                      <td className="px-6 py-4 text-gray-600">{product.rating} ⭐</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
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
