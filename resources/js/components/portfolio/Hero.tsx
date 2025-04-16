import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface HeroProps {
  name: string;
  title: string;
  description: string;
}

export default function Hero({ name, title, description }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Add animations that play immediately when component mounts
  useEffect(() => {
    const elements = document.querySelectorAll('.hero-animate');
    
    // First set the component as loaded
    setIsLoaded(true);
    
    // Then animate elements with delay
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('active');
      }, i * 200);
    });
  }, []);
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute right-0 bottom-0 -mb-40 -mr-40 w-80 h-80 rounded-full bg-indigo-100 dark:bg-indigo-900/30"></div>
        <div className="absolute left-0 top-0 -ml-20 -mt-20 w-60 h-60 rounded-full bg-pink-100 dark:bg-pink-900/20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse  lg:flex lg:flex-row lg:items-center lg:justify-between lg:space-x-10">
          <div className="lg:w-3/5 z-10 mt-10 lg:mt-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className={`block hero-animate slide-in-left opacity-100 delay-100 `}>
                Hi, I'm <mark className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 rounded-md">{name}</mark>
              </span>
              <span className={`block text-indigo-600 dark:text-indigo-400 hero-animate slide-in-left delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {title}
              </span>
            </h1>
            <p className={`mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl hero-animate slide-in-left delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {description}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="#contact"
                className={`hero-animate fade-in delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'} 
                  inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-md 
                  text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 
                  hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg hover:scale-105`}
              >
                Contact Me
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="#projects"
                className={`hero-animate fade-in delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} 
                  inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-600 dark:border-indigo-500 
                  rounded-md shadow-sm text-base font-medium text-indigo-700 dark:text-indigo-300 
                  bg-transparent hover:bg-indigo-50 dark:hover:bg-indigo-900/30 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-md`}
              >
                View Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className={`mt-12 hero-animate fade-in delay-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:w-2/5 flex justify-center z-10">
            <div className={`relative h-72 w-72 lg:h-96 lg:w-96 hero-animate scale-in delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300 to-purple-200 dark:from-indigo-700 dark:to-purple-900 animate-pulse-slow"></div>
              
              {/* Profile image with animated border */}
              <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 p-2 rotate-3 animate-float shadow-lg">
                <div className="rounded-full h-full w-full overflow-hidden bg-indigo-100 dark:bg-indigo-900/40 border-4 border-white dark:border-gray-700 shadow-inner flex items-center justify-center">
                  <svg className="h-40 w-40 text-indigo-500 dark:text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14.25c-3.72 0-6.75 3.03-6.75 6.75h13.5c0-3.72-3.03-6.75-6.75-6.75zM12 13.5a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                  </svg>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-pink-200 dark:bg-pink-800/40 animate-bounce-slow"></div>
              <div className="absolute -top-3 -left-3 h-16 w-16 rounded-full bg-yellow-200 dark:bg-yellow-800/40 animate-ping-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}