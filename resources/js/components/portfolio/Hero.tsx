import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

interface HeroProps {
  name: string;
  title: string;
  description: string;
}

export default function Hero({ name, title, description }: HeroProps) {
  // Add animations that play immediately when component mounts
  useEffect(() => {
    const elements = document.querySelectorAll('.hero-animate');
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('active');
      }, i * 200);
    });
  }, []);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block hero-animate slide-in-left">Hi, I'm {name}</span>
              <span className="block text-indigo-600 dark:text-indigo-400 hero-animate slide-in-left delay-200">{title}</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 dark:text-gray-300 max-w-3xl hero-animate slide-in-left delay-400">
              {description}
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                href="#contact"
                className="hero-animate fade-in delay-600 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105"
              >
                Contact Me
              </Link>
              <Link
                href="#projects"
                className="hero-animate fade-in delay-700 inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105"
              >
                View Projects
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
            <div className="relative h-64 w-64 lg:h-80 lg:w-80 hero-animate scale-in delay-300">
              <div className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-900 animate-pulse-slow"></div>
              {/* Add your profile image here */}
              <div className="absolute inset-4 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center animate-float">
                <svg className="h-32 w-32 text-indigo-500 dark:text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14.25c-3.72 0-6.75 3.03-6.75 6.75h13.5c0-3.72-3.03-6.75-6.75-6.75zM12 13.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}