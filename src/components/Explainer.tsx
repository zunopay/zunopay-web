"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { CheckIcon } from "lucide-react";
import { Text } from "./ui";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
}

function Feature({ title, description }: FeatureProps) {
  return (
    <li className="flex items-start space-x-4">
      <div className="flex-shrink-0 mt-1">
        <div className="flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 rounded-full p-2 shadow-md">
          <CheckIcon className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <Text
          as="h4"
          styleVariant="secondary-heading"
          className="text-blue-800 font-semibold text-base mb-1"
        >
          {title}
        </Text>
        <Text
          as="p"
          styleVariant="body-xlarge"
          className="text-gray-600 text-sm"
        >
          {description}
        </Text>
      </div>
    </li>
  );
}

export function SolutionSection() {
  const isMobile = useIsMobile();
  const imageOrder = isMobile ? "order-2" : "";

  return (
    <section
      id="solutions"
      className="py-24 bg-white rounded-2xl w-fit self-center px-10"
    >
      <div className="mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className={`w-full md:w-1/2 animate-fade-in ${imageOrder}`}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800"
                alt="ZunoPay mobile application"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div
            className="w-full md:w-1/2 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Text
              as="h2"
              styleVariant="secondary-heading"
              className="text-blue-900 text-3xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight"
            >
              Accept <span className="text-blue-600">Stablecoin Payments</span> at
              Your Shop
            </Text>
            <Text
              as="p"
              styleVariant="body-large"
              className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed"
            >
              ZunoPay process stablecoin payments for your business directly in your regional payment interface and provide access to global crypto users
            </Text>

            <ul className="space-y-5 mb-8">
              <Feature
                title="Accept stablecoins in your regional payment interface"
                description="Use UPI, IBAN, PIX to accept stablecoin payments seamlessly."
              />
              <Feature
                title="Near 0 fees"
                description="Enjoy one of the lowest transaction fees in the industry."
              />
              <Feature
                title="Non-custodial"
                description="You have full control and custody over your earnings."
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
