
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { DataTable } from './data-table';
import { getColumns } from './column';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Loader2Icon } from 'lucide-react';
import DeleteDialog from '@/components/custom/delete-dialog';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles & Permissions',
        href: '/settings/role-permissions',
    },
];
// const openDeleteDialog = () => { }
// interface Department {
//     id: number;
//     name: string;
// }

// interface Group {
//     id: number;
//     name: string;
// }
interface Roles {
    id: string;
    name: string;
    permissions: string[]
}
interface RoleForm {
    name: string;
    permissions: string[]
}

export default function RolePermission({ roles, permissions }: { roles: Roles[], permissions: string[]; }) {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState("");
    const [isUpdatingRole, setIsUpdatingRole] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<Roles | null>(null);


    const actionButtonClick = (id: string, action: string) => {
        if (action === "delete") {
            setIsDeleteDialogOpen(true);
            setRoleToDelete(id);
        }
        else if (action === "edit") {
            const role = roles.find(r => r.id === id);
            if (role) {
                setIsUpdatingRole(true);
                setRoleToEdit(role);

                // prefill form
                setData("name", role.name);
                setData("permissions", role.permissions);

                setOpenAddRole(true);
            }
        }
    }

    const openDeleteDialog = (roleId: string) => {
        setIsDeleteDialogOpen(true);
        setRoleToDelete(roleId);
    }
    const columns = getColumns({ onActionButtonClick: actionButtonClick });

    const { data, setData, post,put, errors, processing } = useForm<RoleForm>({
        name: '',
        permissions: []
    });
    const [openAddRole, setOpenAddRole] = useState(false);

    const handleDelete = () => {
        if (roleToDelete) {
            router.delete(`/settings/role-permissions/${roleToDelete}`, {
                onSuccess: () => setIsDeleteDialogOpen(false),
            });
        }
    }

    const handleOpenAddRole = () => {
         resetForm();
        setIsUpdatingRole(false);
        setOpenAddRole(true);
    }

    function resetForm() {
        setData("name", "");
        setData("permissions", []);
        setRoleToEdit(null);
        setIsUpdatingRole(false);
    }

    function submit(e: any) {
        e.preventDefault();

        if (isUpdatingRole && roleToEdit) {
            // update
            put(`/settings/role-permissions/${roleToEdit.id}`, {
                onSuccess: () => {
                    resetForm();
                    setOpenAddRole(false);
                }
            });
        } else {
            // create
            post('/settings/role-permissions', {
                onSuccess: () => {
                    resetForm();
                    setOpenAddRole(false);
                },
            });
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role & Permissions" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className='flex justify-end'>
                    <Dialog open={openAddRole} onOpenChange={setOpenAddRole}>

                        <Button onClick={handleOpenAddRole}>Add Role</Button>


                        <DialogContent className="sm:max-w-[600px]">
                            <form onSubmit={submit}>
                                <AlertDialogHeader>
                                    <DialogTitle>
                                        {isUpdatingRole ? "Update Role" : "Add Role"}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {isUpdatingRole ? "Update role and assign permissions" : "Create new role and assign permissions"}

                                    </DialogDescription>
                                </AlertDialogHeader>
                                <div className="grid gap-6 mt-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="role-name">Role Name</Label>
                                        <Input id="role-name" value={data.name} onChange={(e) => setData('name', e.target.value)} name="name" placeholder='customer support, admin etc' />
                                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                                    </div>
                                    <div className="grid gap-4">
                                        <Label>Permission</Label>
                                        <div className='flex flex-row gap-4 mb-4 flex-wrap'>
                                            {permissions.map((permission, index) => (
                                                <div className="flex items-center space-x-2" key={index}>
                                                    <Switch id={permission}
                                                        checked={data.permissions.includes(permission)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setData("permissions", [...data.permissions, permission]);
                                                            } else {
                                                                setData(
                                                                    "permissions",
                                                                    data.permissions.filter((p) => p !== permission)
                                                                );
                                                            }
                                                        }} />
                                                    <Label htmlFor={permission} className='capitalize'>{permission}</Label>
                                                </div>
                                            ))}

                                        </div>
                                        {errors.permissions && <span className="text-red-500 text-xs">{errors.permissions}</span>}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? (
                                            isUpdatingRole ? (
                                                <>
                                                    <Loader2Icon className="animate-spin mr-2" />
                                                    Updating
                                                </>
                                            ) : (
                                                <>
                                                    <Loader2Icon className="animate-spin mr-2" />
                                                    Creating
                                                </>
                                            )
                                        ) : isUpdatingRole ? "Update role" : "Create role"}
                                    </Button>

                                </DialogFooter>
                            </form>
                        </DialogContent>

                    </Dialog>
                </div>
                <div>
                    <DataTable data={roles} columns={columns} />
                </div>
                <DeleteDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} handleDelete={handleDelete} type='role' />

            </div>


        </AppLayout>
    );
}
