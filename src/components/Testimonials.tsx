import React, { useState, useEffect } from 'react';
import { Quote, Star, User, Briefcase, GraduationCap } from 'lucide-react';

interface TestimonialProps {
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: React.ReactNode;
}

const testimonials: TestimonialProps[] = [
  {
    text: "ShadowTwin helped me understand the creative path I never took. It gave me the confidence to start my side business while keeping my day job. The insights were incredibly valuable.",
    author: "Sarah Chen",
    role: "Product Manager",
    company: "Tech Startup",
    rating: 5,
    avatar: <User className="text-blue-400" size={20} />
  },
  {
    text: "The YouInc simulation completely changed how I view my career trajectory. I now have a clear 5-year plan with measurable goals and ROI targets for my personal development.",
    author: "Marcus Rodriguez",
    role: "Investment Banker",
    company: "Goldman Sachs",
    rating: 5,
    avatar: <Briefcase className="text-green-400" size={20} />
  },
  {
    text: "MicroDeath was profound. It helped me prioritize what truly matters and led to important conversations with my family about legacy and values. Highly recommend for anyone feeling stuck.",
    author: "Dr. Emily Watson",
    role: "Research Scientist",
    company: "Stanford University",
    rating: 5,
    avatar: <GraduationCap className="text-violet-400" size={20} />
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium mb-6">
            <Star size={16} />
            Client Success Stories
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Professionals</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how our AI simulations have helped thousands of professionals gain clarity and make better life decisions.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-full absolute inset-0'
                }`}
              >
                <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Quote content */}
                    <div className="flex-1">
                      <Quote className="text-blue-400 mb-6" size={32} />
                      <blockquote className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8">
                        "{testimonial.text}"
                      </blockquote>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={16} />
                        ))}
                      </div>
                    </div>
                    
                    {/* Author info */}
                    <div className="flex items-center gap-4 md:flex-col md:items-center md:text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <cite className="text-white font-semibold text-lg not-italic">
                          {testimonial.author}
                        </cite>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        <p className="text-gray-500 text-xs">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-blue-400 rounded-full' 
                  : 'w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Stats section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-400 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-400 text-sm">Simulations Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-gray-400 text-sm">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;