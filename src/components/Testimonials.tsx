import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  text: string;
  author: string;
}

const testimonials: TestimonialProps[] = [
  {
    text: "It changed how I think about time.",
    author: "Sarah M."
  },
  {
    text: "I made peace with my regrets.",
    author: "David L."
  },
  {
    text: "Investors called me back after I showed them my 'YouInc.'",
    author: "Maria R."
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-16">
          What People
          <span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent"> Discover</span>
        </h2>

        <div className="relative h-48 flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                index === currentIndex 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
            >
              <div className="relative p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 max-w-2xl">
                <Quote className="absolute top-4 left-4 text-violet-400" size={24} />
                <blockquote className="text-2xl md:text-3xl text-white font-light italic mb-4 pl-8">
                  "{testimonial.text}"
                </blockquote>
                <cite className="text-gray-400 text-lg">— {testimonial.author}</cite>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-violet-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;