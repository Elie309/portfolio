import { Head, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import PortfolioLayout from '@/layouts/PortfolioLayout';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  // Portfolio data
  const personalInfo = {
    name: 'Your Name',
    title: 'Full Stack Developer',
    description: 'I design and develop beautiful, functional websites and applications that deliver exceptional user experiences.',
    aboutContent: 'I am a passionate full stack developer with expertise in Laravel, React, and Tailwind CSS. With a strong foundation in both frontend and backend technologies, I create scalable, responsive, and user-friendly web applications.',
    email: 'your.email@example.com',
    phone: '+1 234 567 8900',
  };

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'TypeScript', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'JavaScript', level: 90 },
        { name: 'HTML/CSS', level: 95 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Laravel', level: 90 },
        { name: 'PHP', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'Express.js', level: 75 },
        { name: 'MySQL', level: 85 },
        { name: 'PostgreSQL', level: 80 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Jest', level: 80 },
        { name: 'Figma', level: 70 },
      ],
    },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A fully functional e-commerce platform built with Laravel and React. Features include product management, cart system, user authentication, and payment integration.',
      image: '/images/project1.jpg',
      tags: ['Laravel', 'React', 'Tailwind CSS', 'MySQL'],
      demoUrl: 'https://example.com/demo',
      repoUrl: 'https://github.com/yourusername/project1',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A modern task management application with drag-and-drop functionality, team collaboration features, and real-time updates.',
      image: '/images/project2.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      demoUrl: 'https://example.com/demo2',
      repoUrl: 'https://github.com/yourusername/project2',
    },
    {
      id: 3,
      title: 'Personal Finance Dashboard',
      description: 'An intuitive dashboard for tracking personal finances, including expense categorization, budget planning, and visualization tools.',
      image: '/images/project3.jpg',
      tags: ['Vue.js', 'Firebase', 'Chart.js'],
      demoUrl: 'https://example.com/demo3',
      repoUrl: 'https://github.com/yourusername/project3',
    },
    {
      id: 4,
      title: 'Social Media Analytics Tool',
      description: 'A comprehensive analytics tool that helps businesses track and analyze their social media performance across multiple platforms.',
      image: '/images/project4.jpg',
      tags: ['React', 'Python', 'Django', 'D3.js'],
      demoUrl: 'https://example.com/demo4',
      repoUrl: 'https://github.com/yourusername/project4',
    },
    {
      id: 5,
      title: 'Real Estate Listing Platform',
      description: 'A feature-rich platform for real estate listings with advanced search capabilities, virtual tours, and agent management.',
      image: '/images/project5.jpg',
      tags: ['Laravel', 'Alpine.js', 'Tailwind CSS', 'PostgreSQL'],
      demoUrl: 'https://example.com/demo5',
      repoUrl: 'https://github.com/yourusername/project5',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with Laravel and React, showcasing your skills and projects.',
      image: '/images/project6.jpg',
      tags: ['Laravel', 'React', 'Tailwind CSS'],
      demoUrl: 'https://example.com/demo6',
      repoUrl: 'https://github.com/yourusername/project6',
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: '<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    },
  ];

  return (
    <PortfolioLayout>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      
      <Hero 
        name={personalInfo.name} 
        title={personalInfo.title} 
        description={personalInfo.description} 
      />
      
      <About content={personalInfo.aboutContent} />
      
      <Skills categories={skillCategories} />
      
      <Projects projects={projects} />
      
      <Contact 
        email={personalInfo.email} 
        phone={personalInfo.phone}
        socialLinks={socialLinks}
      />
    </PortfolioLayout>
  );
}
