"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS } from "@/lib/data/products"
import { Search } from "lucide-react"

const CATEGORIES = ["All", "Accessories", "Electronics", "Apparel", "Fitness", "Home"]
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export function ShopClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort
    switch (sortBy) {
      case "newest":
        return filtered.sort((a, b) => b.id - a.id)
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price)
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }, [searchQuery, selectedCategory, sortBy, priceRange])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Page Header */}
        <section className="border-b border-gray-200 py-8 md:py-12">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
            <p className="text-gray-600">Browse our complete collection of premium products</p>
          </div>
        </section>

        <div className="container py-8 md:py-12">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`fixed inset-0 z-40 md:z-0 md:static md:w-64 lg:w-72 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              <div className="bg-white h-full overflow-y-auto p-6 md:p-0 md:pr-8">
                {/* Close button for mobile */}
                <button onClick={() => setShowFilters(false)} className="md:hidden mb-6 text-lg font-bold">
                  ✕ Close Filters
                </button>

                {/* Search */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Search</h3>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:border-black outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Category</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setPriceRange([0, 500])
                  }}
                  className="w-full py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>

              {/* Mobile backdrop */}
              {showFilters && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setShowFilters(false)} />
              )}
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <button
                  onClick={() => setShowFilters(true)}
                  className="md:hidden px-4 py-2 border border-gray-300 rounded font-medium"
                >
                  Show Filters
                </button>

                <p className="text-gray-600 text-sm">
                  Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> products
                </p>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer focus:border-black outline-none"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600">No products found. Try adjusting your filters.</p>
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
