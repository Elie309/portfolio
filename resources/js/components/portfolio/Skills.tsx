import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef } from 'react';

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center slide-in-bottom">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Skills</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            What I Can Do
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            My technical skills and expertise across various domains.
          </p>
        </div>
        
        <div ref={containerRef} className="mt-16">
          {categories.map((category, categoryIndex) => {
            const categoryRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-50px' });
            
            return (
              <div key={categoryIndex} ref={categoryRef} className={`mb-12 slide-in-left delay-${categoryIndex * 100}`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => {
                    const skillRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-30px' });
                    const delay = (categoryIndex * 100) + (skillIndex * 100);
                    
                    return (
                      <div 
                        key={skillIndex} 
                        ref={skillRef}
                        className={`bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg slide-in-bottom delay-${delay % 1000}`}
                      >
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            {skill.icon && (
                              <div className="flex-shrink-0 mr-3">
                                <span className="text-indigo-500 dark:text-indigo-400" dangerouslySetInnerHTML={{ __html: skill.icon }} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                {skill.name}
                              </p>
                              <div className="mt-1">
                                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div 
                                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: '0%' }}
                                    data-target={`${skill.level}%`}
                                    onTransitionEnd={(e) => {
                                      if (e.propertyName === 'transform') {
                                        const target = e.currentTarget.getAttribute('data-target');
                                        e.currentTarget.style.width = target || '0%';
                                      }
                                    }}
                                    ref={(el) => {
                                      if (el && el.closest('.active')) {
                                        setTimeout(() => {
                                          el.style.width = `${skill.level}%`;
                                        }, 300);
                                      }
                                    }}
                                    aria-valuenow={skill.level}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}