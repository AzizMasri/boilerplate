<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('posts', PostController::class);
    Route::get('users', [UserController::class, 'index'])->name('users.index');

});

Route::middleware(['role:admin'])
->prefix('settings')
->group(function () {
    Route::get('role-permissions', [RolePermissionController::class, 'index'])->name('role-permissions.index');
    Route::post('role-permissions', [RolePermissionController::class, 'store'])->name('role-permissions.store');
    Route::delete('role-permissions/{id}', [RolePermissionController::class, 'destroy'])->name('role-permissions.destroy');
    Route::put('role-permissions/{id}', [RolePermissionController::class, 'update'])->name('role-permissions.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
