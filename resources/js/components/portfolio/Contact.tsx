import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ContactProps {
  email: string;
  phone?: string;
  socialLinks?: {
    name: string;
    url: string;
    icon: string;
  }[];
}

export default function Contact({ email, phone, socialLinks }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const headerRef = useScrollAnimation<HTMLDivElement>();
  const formRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-50px' });
  const infoRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-50px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // In a real app, you'd submit this form data to your backend
    // Here we're just simulating a successful submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center slide-in-bottom">
          <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Contact</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Get In Touch
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Have a question or want to work together? Feel free to reach out to me.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div ref={formRef} className="slide-in-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div className="transition-all duration-300 hover:translate-y-[-2px]">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
                {status === 'success' && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400 animate-pulse">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div 
            ref={infoRef} 
            className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg slide-in-right"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact Information</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center transition-transform duration-300 ease-in-out hover:translate-x-2">
                  <svg className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                    {email}
                  </a>
                </div>
                
                {phone && (
                  <div className="flex items-center transition-transform duration-300 ease-in-out hover:translate-x-2">
                    <svg className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${phone}`} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                      {phone}
                    </a>
                  </div>
                )}
                
                {socialLinks && socialLinks.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Connect with me:</h4>
                      <div className="flex space-x-4">
                        {socialLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-transform duration-300 hover:scale-125"
                            aria-label={link.name}
                          >
                            <span dangerouslySetInnerHTML={{ __html: link.icon }} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}