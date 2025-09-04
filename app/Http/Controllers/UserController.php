<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDepartment;
use App\Models\UserGroup;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function index()
    {
        $users = User::select(['id', 'name', 'email', 'profile_path', 'department_id', 'group_id'])
            ->with([
                'department:id,name',
                'group:id,name',
                'roles:name'
            ])
            ->latest()
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile_path' => Storage::url($user->profile_path),
                    'group' => $user->group?->name,
                    'department' => $user->department?->name,
                    'roles' => $user->roles->pluck('name')->toArray(), 
                 
                ];
            });

        [$departments, $groups] = [
            UserDepartment::select(['id', 'name'])->get(),
            UserGroup::select(['id', 'name'])->get()
        ];

        $roles = Role::select(['id', 'name'])->get();
        $filterOptions = [
            'departments' => $departments->map(fn($dept) => [
                'value' => $dept->name,
                'label' => $dept->name
            ]),
            'groups' => $groups->map(fn($group) => [
                'value' => $group->name,
                'label' => $group->name
            ]),
            'roles' => $roles->map(fn($role) => [
                'value' => $role->name,
                'label' => ucfirst($role->name)
            ]),
        ];

        return Inertia::render('users/index', [
            'users' => $users,
            'departments' => $departments,
            'groups' => $groups,
            'filterOptions' => $filterOptions

        ]);
    }
}
