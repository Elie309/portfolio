import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const headerRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center slide-in-bottom">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Projects</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            My Recent Work
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Check out some of my featured projects that showcase my skills and expertise.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const projectRef = useScrollAnimation<HTMLDivElement>({ 
              threshold: 0.2,
              rootMargin: '-30px'
            });
            
            return (
              <div
                key={project.id}
                ref={projectRef}
                className={`flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-gray-900 scale-in delay-${(index * 100) % 1000}`}
              >
                <div className="flex-shrink-0 overflow-hidden">
                  {project.image ? (
                    <img 
                      className="h-48 w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110" 
                      src={project.image} 
                      alt={project.title} 
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 transition-all duration-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-300">{project.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-all duration-300 hover:translate-x-1"
                      >
                        Live Demo
                        <span aria-hidden="true" className="ml-1 transition-transform duration-300 inline-block group-hover:translate-x-1"> &rarr;</span>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-all duration-300 hover:translate-x-1"
                      >
                        View Code
                        <span aria-hidden="true" className="ml-1 transition-transform duration-300 inline-block group-hover:translate-x-1"> &rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}