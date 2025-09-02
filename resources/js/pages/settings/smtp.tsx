import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'SMTP settings',
        href: '/settings/smtp',
    },
];

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    // const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
    //     name: auth.user.name,
    //     email: auth.user.email,
    // });

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();

    //     patch(route('profile.update'), {
    //         preserveScroll: true,
    //     });
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SMTP settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="SMTP information" description="Update your SMTP Config" />

                    
                </div>

                
            </SettingsLayout>
        </AppLayout>
    );
}
