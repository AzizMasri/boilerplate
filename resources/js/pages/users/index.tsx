import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import DeleteDialog from '@/components/custom/delete-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import { getColumns } from './column';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];
const openDeleteDialog = () => { }

export default function Users({ users, departments, groups }: { users: Array<any>, departments: Array<any>, groups: Array<any> }) {

    const columns = getColumns({ onDelete: openDeleteDialog });
    // const isAdmin = useAuth().isAdmin();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
           
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* {isAdmin && <h1>u admin</h1>} */}
                <div className="flex w-full flex-col gap-6">
                    <Tabs defaultValue="members">
                        <TabsList>
                            <TabsTrigger value="members">Members</TabsTrigger>
                            <TabsTrigger value="groups">Groups</TabsTrigger>
                        </TabsList>
                        <TabsContent value="members">
                            <div className='w-full'>
                                <DataTable data={users} columns={columns} />
                            </div>
                        </TabsContent>
                        <TabsContent value="groups">
                            <h1>Password</h1>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>


        </AppLayout>
    );
}
