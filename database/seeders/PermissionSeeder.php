<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'view post']);
        Permission::create(['name' => 'edit post']);
        Permission::create(['name' => 'create post']);
        Permission::create(['name' => 'delete post']);
    }
}
