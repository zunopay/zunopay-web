'use client';

import { StarIcon } from "lucide-react";
import { Text } from "./ui";

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  avatarUrl: string;
}

function TestimonialCard({ name, title, quote, avatarUrl }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center mb-5">
        <img
          src={avatarUrl}
          alt={`${name} testimonial`}
          className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-blue-100"
        />
        <div>
          <Text as="h4" styleVariant="secondary-heading" className="text-blue-800 font-semibold text-lg">
            {name}
          </Text>
          <Text as="p" styleVariant="body-small" className="text-gray-500 text-sm">
            {title}
          </Text>
        </div>
      </div>

      <Text
        as="h6"
        styleVariant="body-normal"
        className="text-gray-700 italic leading-relaxed mb-6"
      >
        “{quote}”
      </Text>

      <div className="flex space-x-1 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="h-5 w-5" />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Josip Volarevic",
      title: "Founder at Fundl",
      quote:
        "ZunoPay has transformed how we process customer payments. What used to take days now happens instantly, and the reduced fees have made a significant impact on our bottom line.",
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    },
    {
      name: "Matija Luketin",
      title: "Founder at Superteam Balkan & Souldev",
      quote:
        "Integrating ZunoPay into our online store was remarkably easy. We've seen a 15% increase in completed transactions and customer satisfaction scores have improved significantly.",
      avatarUrl:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    }
  ];

  return (
    <section className="py-24 bg-gray-50 rounded-2xl mb-11">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <Text
          as="h2"
          styleVariant="secondary-heading"
          className="text-3xl md:text-4xl font-bold text-blue-800 mb-14"
        >
          Hear From Our Happy Users
        </Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
              avatarUrl={testimonial.avatarUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
