<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Pail\ValueObjects\Origin\Console;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   $roles = Role::select(['id', 'name'])
        ->with(['permissions:name'])
        ->get()
        ->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->toArray(),
            ];
        });
        
        $permissions = Permission::pluck('name')->toArray();
        
        
        return Inertia::render('roles/index',[
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|array|min:1'
        ]);

        $createdRole = Role::create(['name' => $request->name]);
        $createdRole->syncPermissions($request->permissions);
        return back()->with('success', 'Role created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,'.$id,
            'permissions' => 'required|array|min:1'
        ]);
        $role = Role::find($id);
        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);
        return back()->with('success', 'Role updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $role = Role::find($id);
            $userWithRole = $role->users()->count();
            if($userWithRole > 0){
                return back()->with('error', 'Failed to delete Role has users assigned to it');
            }
            $role->delete();
            return back()->with('success', 'Role deleted successfully');
        }
        catch(\Exception $e){
            return back()->with('error', $e->getMessage());
        }
    }

}
