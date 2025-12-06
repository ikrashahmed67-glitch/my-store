import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { TestimonialsSection } from "@/components/section-testimonials"
import { PRODUCTS, TESTIMONIALS } from "@/lib/data/products"
import Link from "next/link"

export const metadata = {
  title: "Minimal - Premium Products",
  description: "Discover our carefully curated collection of premium products",
  openGraph: {
    title: "Minimal - Premium Products",
    description: "Discover our carefully curated collection of premium products",
    type: "website",
  },
}

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4)

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-white py-24 md:py-40 border-b border-gray-200">
          <div className="container">
            <div className="text-center animate-fade-in max-w-4xl mx-auto">
              <h1 className="text-balance text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                Premium Collection
              </h1>
              <p className="text-xl text-gray-600 mb-10 text-balance">
                Carefully curated products for those who appreciate quality, design, and exceptional craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-block px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/about"
                  className="inline-block px-8 py-3 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600">Hand-picked selections for the discerning customer</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-block px-6 py-3 border-2 border-black text-black font-medium rounded hover:bg-black hover:text-white transition-colors"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold mb-16 text-center">Why Shop With Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description: "Every product is carefully selected and tested for quality and durability.",
                },
                {
                  title: "Fast Shipping",
                  description: "Free shipping on orders over $100. Arrive in 2-3 business days.",
                },
                {
                  title: "Customer Support",
                  description: "Our dedicated team is available 24/7 to help with any questions.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-lg text-center shadow-soft">
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection testimonials={TESTIMONIALS} />

        {/* Newsletter */}
        <section className="py-20 md:py-32">
          <div className="container max-w-2xl">
            <h2 className="text-4xl font-bold mb-6 text-center">Stay Updated</h2>
            <p className="text-center text-gray-600 mb-8">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded focus:border-black outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
