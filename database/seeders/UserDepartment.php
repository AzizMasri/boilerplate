<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserDepartment extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userDepartments = [
            ['name'=>'unassigned'],
            ['name'=>'IT'],
           
        ];

        DB::table('user_departments')->insert($userDepartments);
    }
}
