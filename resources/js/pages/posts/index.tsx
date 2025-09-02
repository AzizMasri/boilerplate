import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { DataTable } from './data-table';
import { getColumns } from './column';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import DeleteDialog from '@/components/custom/delete-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts({ posts }: { posts: Array<any> }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);


    const openDeleteDialog = (postId: string) => {
        setPostToDelete(postId);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (postToDelete) {
            router.delete(`/posts/${postToDelete}`),{
                onSuccess: () => setIsDeleteDialogOpen(false),
            };
            
        }
    }
    const columns = getColumns({ onDelete: openDeleteDialog });
    // console.log('POST', posts);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    <DataTable data={posts} columns={columns} />
                </div>
            </div>
            <DeleteDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} handleDelete={handleDelete} />
           
        </AppLayout>
    );
}
