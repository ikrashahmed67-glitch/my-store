"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  text: string
  avatar: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container">
        <h2 className="text-4xl font-bold mb-16 text-center">What Our Customers Say</h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-soft">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-800">"{current.text}"</p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <Image
                src={current.avatar || "/placeholder.svg"}
                alt={current.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{current.name}</p>
                <p className="text-sm text-gray-600">{current.role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={goToPrevious}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>

              {/* Indicators */}
              <div className="flex gap-2 ml-auto">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentIndex ? "w-8 bg-black" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
