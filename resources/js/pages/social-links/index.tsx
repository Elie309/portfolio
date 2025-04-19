import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon, MoveIcon, TrashIcon, EditIcon, ShareIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Social Links',
        href: '/social-links',
    },
];

interface SocialLink {
    id: number;
    name: string;
    url: string;
    icon: string | null;
    display_order: number;
}

interface SocialLinksPageProps {
    socialLinks: SocialLink[];
}

export default function SocialLinks({ socialLinks = [] }: SocialLinksPageProps) {
    const [reordering, setReordering] = useState(false);
    const [items, setItems] = useState(socialLinks);

    const saveOrder = () => {
        fetch('/api/social-links/reorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({ 
                socialLinks: items.map((item, index) => ({
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
            console.error('Error saving social link order:', error);
        });
    };

    const moveItem = (fromIndex: number, toIndex: number) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setItems(updatedItems);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this social link?')) {
            fetch(`/api/social-links/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            })
            .then(() => {
                setItems(items.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error('Error deleting social link:', error);
            });
        }
    };

    // Common social media icons map
    const socialIcons: Record<string, React.ReactNode> = {
        github: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>,
        linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>,
        twitter: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.169 1.207 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
        facebook: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>,
        instagram: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>,
        youtube: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path></svg>,
    };

    // Function to get icon for a social link
    const getSocialIcon = (name: string) => {
        const lowercaseName = name.toLowerCase();
        
        // Check if we have a predefined icon for this social network
        for (const [key, icon] of Object.entries(socialIcons)) {
            if (lowercaseName.includes(key)) {
                return icon;
            }
        }
        
        // Default icon if no match
        return <ShareIcon className="w-5 h-5" />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Links" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Social Links</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your social media and external links</p>
                    </div>
                    <div className="flex gap-2">
                        {reordering ? (
                            <>
                                <button
                                    onClick={() => {
                                        setItems(socialLinks);
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
                                    href="/social-links/create"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    New Link
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center border rounded-xl mt-4">
                        <ShareIcon className="h-16 w-16 mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-2">No social links yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                            Connect your social media accounts and other platforms to showcase on your portfolio.
                        </p>
                        <Link
                            href="/social-links/create"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Link
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 mt-4">
                        {items.map((link, index) => (
                            <div key={link.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="mr-3 text-gray-600 dark:text-gray-300">
                                        {getSocialIcon(link.name)}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{link.name}</h3>
                                        <a 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                </div>
                                
                                {reordering ? (
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
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            title="Delete"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                        <Link 
                                            href={`/social-links/${link.id}/edit`}
                                            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            title="Edit"
                                        >
                                            <EditIcon className="h-5 w-5" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
