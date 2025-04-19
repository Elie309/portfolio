import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon, GlobeIcon, TrashIcon, MoveIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/projects',
    },
];

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    display_order: number;
    tags: string[];
}

interface ProjectsPageProps {
    projects: Project[];
}

export default function Projects({ projects = [] }: ProjectsPageProps) {
    const [reordering, setReordering] = useState(false);
    const [items, setItems] = useState(projects);

    const saveOrder = () => {
        // Here you would implement saving the new order to the backend
        fetch('/api/projects/reorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ 
                projects: items.map((item, index) => ({
                    id: item.id,
                    display_order: index
                }))
            }),
        })
        .then(response => response.json())
        .then(() => {
            setReordering(false);
        })
        .catch(error => {
            console.error('Error saving project order:', error);
        });
    };

    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setItems(updatedItems);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            fetch(`/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            })
            .then(() => {
                setItems(items.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error('Error deleting project:', error);
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Projects</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage and organize your portfolio projects</p>
                    </div>
                    <div className="flex gap-2">
                        {reordering ? (
                            <>
                                <button
                                    onClick={() => {
                                        setItems(projects);
                                        setReordering(false);
                                    }}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={saveOrder}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                                >
                                    Save Order
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setReordering(true)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium"
                                    disabled={items.length < 2}
                                >
                                    Reorder
                                </button>
                                <Link
                                    href="/projects/create"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    New Project
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-xl mt-4">
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
                ) : (
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {items.map((project, index) => (
                            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="md:flex items-start gap-4">
                                    <div className="w-full md:w-48 aspect-video mb-4 md:mb-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                        {project.image ? (
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center">
                                                <PlaceholderPattern className="w-12 h-12 stroke-gray-400/30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-semibold">{project.title}</h2>
                                            {reordering && (
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => moveItem(index, Math.max(0, index - 1))}
                                                        disabled={index === 0}
                                                        className={`p-1 ${index === 0 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}
                                                        title="Move up"
                                                    >
                                                        <MoveIcon className="h-5 w-5 rotate-180" />
                                                    </button>
                                                    <button 
                                                        onClick={() => moveItem(index, Math.min(items.length - 1, index + 1))}
                                                        disabled={index === items.length - 1}
                                                        className={`p-1 ${index === items.length - 1 ? 'text-gray-300 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}
                                                        title="Move down"
                                                    >
                                                        <MoveIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                                            {project.description.length > 200 
                                                ? `${project.description.substring(0, 200)}...` 
                                                : project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {Array.isArray(project.tags) && project.tags.map((tag, tagIndex) => (
                                                <span 
                                                    key={tagIndex} 
                                                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {!reordering && (
                                            <div className="mt-4 flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                                                >
                                                    <TrashIcon className="h-4 w-4 mr-1" />
                                                    Delete
                                                </button>
                                                <Link 
                                                    href={`/projects/${project.id}/edit`}
                                                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <a 
                                                    href={`/projects/${project.id}`}
                                                    target="_blank"
                                                    className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center"
                                                >
                                                    <GlobeIcon className="h-4 w-4 mr-1" />
                                                    View
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
