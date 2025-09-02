<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDepartment;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function index()
    {
        $users = User::select(['id', 'name', 'email', 'department_id', 'group_id'])
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
                    'group' => $user->group?->name,
                    'department' => $user->department?->name,
                    'role' => $user->roles->pluck('name'),
                ];
            });

        [$departments, $groups] = [
        UserDepartment::select(['id', 'name'])->get(),
        UserGroup::select(['id', 'name'])->get()
    ];

        return Inertia::render('users/index', [
            'users' => $users,
            'departments' => $departments,
            'groups' => $groups

        ]);
    }
}
