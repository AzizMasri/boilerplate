<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDepartment;
use App\Models\UserGroup;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Laravolt\Avatar\Avatar;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $userDepartments = UserDepartment::select('name', 'id')->get();
        $userGroups = UserGroup::select('name', 'id')->get();
        return Inertia::render('auth/register', [
            'userDepartments' => $userDepartments,
            'userGroups' => $userGroups
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'group_id' => $request->group_id,
            'department_id' => $request->department_id,
            'password' => Hash::make($request->password),
        ]);

   


        $colors = [
            '#1abc9c', // teal
            '#16a085', // dark teal
            '#3498db', // bright blue
            '#2980b9', // darker blue
            '#9b59b6', // purple
            '#8e44ad', // dark purple
            '#e74c3c', // red
            '#c0392b', // dark red
            '#f39c12', // orange
            '#d35400', // dark orange
            '#2ecc71', // green
            '#27ae60', // dark green
            '#f1c40f', // yellow
            '#e67e22', // carrot orange
            '#34495e', // dark slate
            '#2c3e50', // midnight blue
            '#ff7675', // soft red/pink
            '#fd79a8', // pink
            '#55efc4', // mint green
            '#81ecec', // cyan
            '#74b9ff', // light blue
            '#a29bfe', // light purple
            '#ffeaa7', // pastel yellow
            '#fab1a0', // pastel orange
        ];

        $userInitials = strtoupper(substr($request->name, 0, 2));
        $fileName = $user->id . '_' . $userInitials . '.svg';

        $avatar = new Avatar();

        $randomColor = $colors[array_rand($colors)];
        $generateAvatar = $avatar->create($userInitials)->setBackground($randomColor)->setForeground('#ffffff')->setDimension(300, 300)->setShape('circle')->setFontSize(90)->setFontFamily('Open Sans');
        $path = 'avatars/' . $fileName;
        // $generateAvatar->save(public_path('storage/' . $path, 100));
        Storage::disk('public')->put(
            $path,
            $generateAvatar->toSvg()
        );

   
        $user->update([
            'profile_path' => $path,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
