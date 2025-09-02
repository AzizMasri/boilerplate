
"use client"

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Post',
        href: '/posts',
    },
];

type Category = {
    id: number;
    name: string;
};

export default function CreatePost({ categories }: { categories: Category[] }) {
    console.log(categories);

    const { data, setData, post, errors, processing } = useForm({
        title: '',
        body: '',
        category_id: '',
        path: '',
    });

    function submit(e: any) {
        e.preventDefault();
        post('/posts');
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className='p-4'>
                <Head title="Create Post" />
                <div>
                    <Heading title="Create Post" description="Fill in the form below to create a new post" />

                </div>
                <form onSubmit={submit}>
                    <div className='flex flex-col gap-4'>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input type="title" id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Your Post Title"
                                className={errors.title ? 'border-red-600' : ''} />

                            {errors.title && <p className='text-xs text-red-600 px-2'>{errors.title}</p>}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="body">Content</Label>
                            <Textarea placeholder="Your Post Content"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                className={errors.body ? 'border-red-600' : ''} />
                            {errors.body && <p className='text-xs text-red-600 px-2'>{errors.body}</p>}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="email">Category</Label>
                            <Select value={String(data.category_id)} onValueChange={(e) => setData('category_id', e.toString())}>
                                <SelectTrigger className={errors.category_id ? 'w-full border-red-600' : 'w-full'}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Post Category</SelectLabel>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)} className='capitalize'>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.category_id && <p className='text-xs text-red-600 px-2'>{errors.category_id}</p>}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture" type="file" onChange={(e) => {
                                if (e.target.files) {
                                    const file = e.target.files[0];
                                    console.log(file);
                                    const fileUrl = URL.createObjectURL(file);
                                    setData('path', fileUrl);
                                }
                            }} />
                        </div>
                        
                        <div className="grid w-full max-w-sm items-center gap-3">

                            {processing ?
                                <Button size="sm" disabled>
                                    <Loader2Icon className="animate-spin" />
                                    Adding
                                </Button> :
                                <Button size='sm' type="submit">Create Post</Button>
                            }
                        </div>

                    </div>
                </form>
            </div>




        </AppLayout>
    );
}
