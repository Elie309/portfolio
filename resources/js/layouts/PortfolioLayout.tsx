import { Link } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

interface PortfolioLayoutProps {
  children: ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { appearance, updateAppearance } = useAppearance();

  // Initialize with system theme on first load
  useEffect(() => {
    if (!localStorage.getItem('appearance')) {
      updateAppearance('system');
    }
  }, [updateAppearance]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    updateAppearance(appearance === 'dark' ? 'light' : 'dark');
  };

  // Handle scroll events for navigation highlight and navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector('.navbar-animate');
      // Determine scroll direction and update navbar visibility
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
        if (navbar) {
          navbar.classList.add('opacity-0');
          navbar.classList.remove('opacity-100');
        }
      } else {
        // Scrolling up
        setShowNavbar(true);
        if (navbar) {
          navbar.classList.add('opacity-100');
          navbar.classList.remove('opacity-0');
        }
      }
      
      // Add shadow to navbar when scrolled
      setScrolled(currentScrollY > 10);
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      const scrollY = currentScrollY + 100;
      
      sections.forEach((section) => {
        const sectionId = section.getAttribute('id');
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop;
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && sectionId) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  // Animated entrance for the navbar and footer
  useEffect(() => {
    const navbar = document.querySelector('.navbar-animate');
    const footer = document.querySelector('.footer-animate');
    
    if (navbar) {
      navbar.classList.add('opacity-100');
      navbar.classList.remove('opacity-0');
    }
    
    if (footer) {
      setTimeout(() => {
        footer.classList.add('translate-y-0', 'opacity-100');
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className={`sticky top-0 z-10 bg-white/80 backdrop-blur-md dark:bg-gray-800/80 navbar-animate transition-all duration-300 transform ${showNavbar ? 'translate-y-0' : '-translate-y-full'} opacity-0 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Portfolio
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link 
                href="#about" 
                className={`text-gray-600 dark:text-gray-300 transition-all duration-300 ${activeSection === 'about' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'hover:text-gray-900 dark:hover:text-white'}`}
              >
                <span className="relative">
                  About
                  {activeSection === 'about' && 
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform transition-transform origin-left"></span>
                  }
                </span>
              </Link>
             
              <Link 
                href="#projects" 
                className={`text-gray-600 dark:text-gray-300 transition-all duration-300 ${activeSection === 'projects' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'hover:text-gray-900 dark:hover:text-white'}`}
              >
                <span className="relative">
                  Projects
                  {activeSection === 'projects' && 
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform transition-transform origin-left"></span>
                  }
                </span>
              </Link>
              <Link 
                href="#contact" 
                className={`text-gray-600 dark:text-gray-300 transition-all duration-300 ${activeSection === 'contact' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'hover:text-gray-900 dark:hover:text-white'}`}
              >
                <span className="relative">
                  Contact
                  {activeSection === 'contact' && 
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 transform transition-transform origin-left"></span>
                  }
                </span>
              </Link>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {appearance === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner footer-animate transition-all duration-500 transform translate-y-10 opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="animate-pulse-slow">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
            <p className="mt-2 text-sm">
              <a href="#" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300 hover:underline">
                Back to top <span className="inline-block transform hover:-translate-y-1 transition-transform duration-300">↑</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}