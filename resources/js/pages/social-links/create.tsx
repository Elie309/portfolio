import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ShareIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Social Links',
        href: '/social-links',
    },
    {
        title: 'Create Link',
        href: '/social-links/create',
    },
];

// Common social platforms for suggestions
const commonPlatforms = [
    'GitHub',
    'LinkedIn',
    'Twitter',
    'Instagram',
    'Facebook',
    'YouTube',
    'Dribbble',
    'Behance',
    'Medium',
    'Dev.to',
    'Stack Overflow',
    'CodePen',
    'Personal Website',
];

export default function CreateSocialLink() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/social-links');
    };

    const handlePlatformSelect = (platform: string) => {
        setData('name', platform);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Social Link" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Add Social Link</h1>
                    <p className="text-gray-500 dark:text-gray-400">Connect your social media and external accounts</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Platform Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2 shadow-sm"
                                required
                                placeholder="e.g. GitHub, LinkedIn, Twitter"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">
                                Common Platforms
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {commonPlatforms.map((platform) => (
                                    <button
                                        key={platform}
                                        type="button"
                                        onClick={() => handlePlatformSelect(platform)}
                                        className={`px-3 py-1 text-sm rounded-full ${
                                            data.name === platform
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="url" className="block text-sm font-medium">
                                URL <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                    <ShareIcon className="h-4 w-4" />
                                </span>
                                <input
                                    type="url"
                                    id="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 p-2"
                                    placeholder="https://example.com/profile"
                                    required
                                />
                            </div>
                            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Include the full URL including https:// or http://
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <a
                            href="/social-links"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Adding...' : 'Add Link'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
