import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AboutProps {
  content: string;
}

export default function About({ content }: AboutProps) {
  const headingRef = useScrollAnimation<HTMLDivElement>();
  const contentRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-50px' });
  const card1Ref = useScrollAnimation<HTMLDivElement>({ rootMargin: '-80px' });
  const card2Ref = useScrollAnimation<HTMLDivElement>({ rootMargin: '-80px' });
  const card3Ref = useScrollAnimation<HTMLDivElement>({ rootMargin: '-80px' });

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center slide-in-bottom">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">About Me</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Who I Am
          </p>
          <div ref={contentRef} className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300 slide-in-bottom delay-200">
            <p>{content}</p>
          </div>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div 
            ref={card1Ref} 
            className="bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-8 w-full sm:w-80 slide-in-bottom delay-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="text-indigo-500 dark:text-indigo-400 mb-4 animate-float">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Professional</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Experienced in delivering high-quality solutions and meeting client requirements.
            </p>
          </div>
          
          <div 
            ref={card2Ref} 
            className="bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-8 w-full sm:w-80 slide-in-bottom delay-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="text-indigo-500 dark:text-indigo-400 mb-4 animate-pulse-slow">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Creative</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Passionate about creating innovative and engaging user experiences.
            </p>
          </div>
          
          <div 
            ref={card3Ref} 
            className="bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-8 w-full sm:w-80 slide-in-bottom delay-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="text-indigo-500 dark:text-indigo-400 mb-4 animate-bounce-slow">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Continuous Learner</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Always learning new technologies and staying up to date with industry trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}