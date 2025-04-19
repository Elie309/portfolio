import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { PencilIcon, PlusIcon, GlobeIcon, LinkIcon, UserIcon, ShareIcon, AlertCircleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Define types for the portfolio data
interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

interface SocialLink {
    id: number;
    name: string;
    url: string;
}

interface PersonalInfo {
    id: number;
    name: string;
    title: string;
    email: string;
}

// Define the page props interface that extends Inertia's SharedProps
interface DashboardProps {
    personalInfo: PersonalInfo | null;
    projects: Project[];
    socialLinks: SocialLink[];
    stats: {
        projects: number;
        social_links: number;
    };
}

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Dashboard error:', error);
      setHasError(true);
      setError(error.error || new Error('Unknown error occurred'));
      return true;
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-900/20">
        <div className="flex justify-center mb-4">
          <AlertCircleIcon className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400">Something went wrong</h2>
        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          {error?.message || 'There was an error loading the dashboard. Please try refreshing the page.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-800/40 dark:text-red-300 dark:hover:bg-red-800/60"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

// Fallback components for empty data
function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <PlaceholderPattern className="w-32 h-32 mb-4 stroke-neutral-900/20 dark:stroke-neutral-100/20" />
      <h3 className="text-lg font-medium mb-2">No projects yet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
        Start building your portfolio by adding some projects to showcase your work.
      </p>
      <Link
        href="/projects/create"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Your First Project
      </Link>
    </div>
  );
}

function EmptySocialLinks() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-4">
      <ShareIcon className="h-10 w-10 mb-2 text-purple-300 dark:text-purple-700" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No social links connected
      </p>
      <Link
        href="/social-links/create"
        className="mt-2 text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400"
      >
        Connect Now
      </Link>
    </div>
  );
}

export default function Dashboard() {
    // Use a more generic approach to get the page props
    const page = usePage();
    const props = page.props as unknown as DashboardProps;
    
    // Add fallbacks for potentially missing data
    const personalInfo = props.personalInfo || null;
    const projects = props.projects || [];
    const socialLinks = props.socialLinks || [];
    const stats = props.stats || { projects: 0, social_links: 0 };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <ErrorBoundary>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-5 w-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold">Personal Info</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        {personalInfo ? `${personalInfo.name} - ${personalInfo.title}` : 'Set up your personal information'}
                                    </p>
                                </div>
                                <div>
                                    <Link 
                                        href={personalInfo ? `/personal-info/${personalInfo.id}/edit` : "/personal-info/create"}
                                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        {personalInfo ? (
                                            <>
                                                <PencilIcon className="h-4 w-4 mr-1" />
                                                Edit Information
                                            </>
                                        ) : (
                                            <>
                                                <PlusIcon className="h-4 w-4 mr-1" />
                                                Create Profile
                                            </>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-5 w-5 text-green-600" />
                                        <h3 className="text-lg font-semibold">Projects</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        {stats.projects} project{stats.projects !== 1 ? 's' : ''} in your portfolio
                                    </p>
                                    {projects.length > 0 && (
                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                            Latest: {projects[0]?.title}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {projects.length > 0 && (
                                        <Link 
                                            href="/projects"
                                            className="flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                        >
                                            <GlobeIcon className="h-4 w-4 mr-1" />
                                            Manage
                                        </Link>
                                    )}
                                    <Link 
                                        href="/projects/create"
                                        className="flex items-center text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                    >
                                        <PlusIcon className="h-4 w-4 mr-1" />
                                        {projects.length > 0 ? 'Add New' : 'Add First Project'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-4">
                            {socialLinks.length > 0 ? (
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <ShareIcon className="h-5 w-5 text-purple-600" />
                                            <h3 className="text-lg font-semibold">Social Links</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            {stats.social_links} social link{stats.social_links !== 1 ? 's' : ''} connected
                                        </p>
                                        {socialLinks.length > 0 && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Including: {socialLinks.slice(0, 2).map(link => link.name).join(', ')}
                                                {socialLinks.length > 2 ? '...' : ''}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            href="/social-links"
                                            className="flex items-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                                        >
                                            <LinkIcon className="h-4 w-4 mr-1" />
                                            Manage
                                        </Link>
                                        <Link 
                                            href="/social-links/create"
                                            className="flex items-center text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                                        >
                                            <PlusIcon className="h-4 w-4 mr-1" />
                                            Add New
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <EmptySocialLinks />
                            )}
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4">
                        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                        {projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {projects.slice(0, 6).map((project) => (
                                    <div key={project.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                                        {project.image ? (
                                            <div className="aspect-video overflow-hidden mb-3 rounded-md bg-gray-100 dark:bg-gray-800">
                                                <img 
                                                    src={project.image} 
                                                    alt={project.title} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Replace broken image with placeholder
                                                        e.currentTarget.src = '/images/placeholder.jpg';
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video mb-3 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <PlaceholderPattern className="w-12 h-12 stroke-gray-400/30" />
                                            </div>
                                        )}
                                        <h3 className="font-medium text-base">{project.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {Array.isArray(project.tags) && project.tags.slice(0, 3).map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {Array.isArray(project.tags) && project.tags.length > 3 && (
                                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                            <Link 
                                                href={`/projects/${project.id}/edit`}
                                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyProjects />
                        )}
                    </div>
                </div>
            </ErrorBoundary>
        </AppLayout>
    );
}
