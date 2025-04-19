import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { PlusIcon, X, ImageIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string | null;
    url: string | null;
    github_url: string | null;
    tags: string[];
}

interface EditProjectProps {
    project: Project;
}

export default function EditProject({ project }: EditProjectProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Projects',
            href: '/projects',
        },
        {
            title: 'Edit Project',
            href: `/projects/${project.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: project.title,
        description: project.description,
        url: project.url || '',
        github_url: project.github_url || '',
        tags: project.tags || [],
        image: null as File | null,
        _method: 'PUT',
    });

    const [newTag, setNewTag] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(project.image);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addTag = () => {
        if (newTag.trim() && !data.tags.includes(newTag.trim())) {
            setData('tags', [...data.tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setData('tags', data.tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            
            // Create image preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/projects/${project.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project: ${project.title}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Edit Project</h1>
                    <p className="text-gray-500 dark:text-gray-400">Update your project details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium">
                                Project Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2 shadow-sm"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2 shadow-sm"
                                required
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="url" className="block text-sm font-medium">
                                    Project URL
                                </label>
                                <input
                                    type="url"
                                    id="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2 shadow-sm"
                                    placeholder="https://example.com"
                                />
                                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                            </div>

                            <div>
                                <label htmlFor="github_url" className="block text-sm font-medium">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    id="github_url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2 shadow-sm"
                                    placeholder="https://github.com/username/repo"
                                />
                                {errors.github_url && <p className="text-red-500 text-sm mt-1">{errors.github_url}</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tags" className="block text-sm font-medium mb-1">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {data.tags.map((tag, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="newTag"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addTag();
                                        }
                                    }}
                                    className="block w-full rounded-l-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2 shadow-sm"
                                    placeholder="Add a tag"
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                </button>
                            </div>
                            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Project Image
                            </label>
                            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
                                {previewImage ? (
                                    <div className="text-center">
                                        <img 
                                            src={previewImage} 
                                            alt="Preview" 
                                            className="mx-auto h-40 object-cover mb-2 rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setData('image', null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center" onClick={() => fileInputRef.current?.click()}>
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-2">
                                            <button
                                                type="button"
                                                className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                            >
                                                Upload a file
                                            </button>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
                                    post(`/projects/${project.id}`, {
                                        data: { _method: 'DELETE' },
                                    });
                                }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                        >
                            Delete Project
                        </button>
                        <div className="space-x-2">
                            <a
                                href="/projects"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium"
                            >
                                Cancel
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
