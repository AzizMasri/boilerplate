<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserGroup extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $userGroups = [
            ['name'=>'unassigned'],
            ['name'=>'technical'],
           
        ];

        DB::table('user_groups')->insert($userGroups);
    }
}
