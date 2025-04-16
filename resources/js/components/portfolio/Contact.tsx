import { useState, useEffect } from 'react';
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
  const [focused, setFocused] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const headerRef = useScrollAnimation<HTMLDivElement>();
  const formRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-50px' });
  const infoRef = useScrollAnimation<HTMLDivElement>({ rootMargin: '-50px' });

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success' || status === 'error') {
      timer = setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    // In a real app, you'd submit this form data to your backend
    // Here we're just simulating a successful submission
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100 dark:bg-pink-900/20 rounded-full filter blur-3xl opacity-30 translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <div
                className={`transition-all duration-300 ${focused === 'name' ? 'transform -translate-y-2' : ''}`}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${formErrors.name ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm transition-all duration-300`}
                    placeholder="Your name"
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fadeIn">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div
                className={`transition-all duration-300 ${focused === 'email' ? 'transform -translate-y-2' : ''}`}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={`appearance-none block w-full pl-10 pr-3 py-2 border ${formErrors.email ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm transition-all duration-300`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fadeIn">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div
                className={`transition-all duration-300 ${focused === 'message' ? 'transform -translate-y-2' : ''}`}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className={`appearance-none block w-full px-3 py-2 border ${formErrors.message ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white sm:text-sm transition-all duration-300`}
                    placeholder="Your message here..."
                  />
                </div>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-fadeIn">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="cursor-pointer w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) :
                    <>
                      {/* SVG Send */}
                      <span className='mr-2'>
                        Send Message
                      </span>

                      <svg className='size-5' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" mirror-in-rtl="true">
                        <path className='fill-white' d="M21.4 2c.322 0 .6.277.6.6 0 .1-.028.178-.078.276l-8.29 17.3c-.1.19-.288.323-.532.323-.222 0-.4-.112-.522-.278l-1.822-3.02c-.1-.177-.29-.3-.5-.3l-2.4.012c-.333 0-.61-.277-.61-.61 0-.022.21-1.975.31-2.84.022-.245-.09-.49-.31-.622-1.19-.71-4.934-2.963-4.956-2.974-.18-.1-.29-.3-.29-.51 0-.255.156-.477.39-.577 0 0 18.788-6.735 18.788-6.746.078-.023.144-.034.222-.034M9.744 14.352L21.578 2.488 10.168 10.5l-.424 3.852M21.4 0c-.258 0-.51.036-.77.11L19.18.523 1.602 6.943C.63 7.358 0 8.306 0 9.357c0 .928.493 1.785 1.287 2.242.105.062 3.416 2.052 4.182 2.51-.095.84-.226 2.036-.226 2.195 0 1.44 1.17 2.61 2.61 2.61l1.594-.007 1.517 2.498c.51.695 1.288 1.094 2.135 1.094.966 0 1.848-.53 2.3-1.385L23.684 3.83c.208-.367.317-.788.317-1.23C24 1.165 22.834 0 21.4 0z" />
                      </svg>
                    </>

                  }
                </button>

                {status === 'success' && (
                  <div className="mt-4 flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fadeIn">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-4 flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fadeIn">
                    <svg className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      There was an error sending your message. Please try again.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div
            ref={infoRef}
            className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg slide-in-right overflow-hidden"
          >
            <div className="px-6 py-6">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white mb-6">Contact Information</h3>

              <div className="mt-6 space-y-6">
                <div className="flex items-center transition-all duration-300 ease-in-out hover:translate-x-2 group">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                    <svg className="h-5 w-5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${email}`} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-lg">
                    {email}
                  </a>
                </div>

                {phone && (
                  <div className="flex items-center transition-all duration-300 ease-in-out hover:translate-x-2 group">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                      <svg className="h-5 w-5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a href={`tel:${phone}`} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 text-lg">
                      {phone}
                    </a>
                  </div>
                )}

                {/* Map */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">My Location:</h4>
                  <div className="h-52 w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner">
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-600 animate-pulse flex items-center justify-center">
                      <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    {/* In a real app, you would embed a Google Maps or other map here */}
                  </div>
                </div>

                {socialLinks && socialLinks.length > 0 && (
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Connect with me:</h4>
                    <div className="flex space-x-6">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                          aria-label={link.name}
                        >
                          <div className="transform group-hover:scale-125 transition-transform duration-300">
                            <span dangerouslySetInnerHTML={{ __html: link.icon }} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Availability indicator */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 mt-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Currently available for new projects!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}