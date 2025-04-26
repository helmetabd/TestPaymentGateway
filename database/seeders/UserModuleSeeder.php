<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Module::where('name', 'user')->firstOrNew();
        $user->fill([
            'display_name' => 'User',
            'create' => 0,
            'read' => 1,
            'update' => 0,
        ]);
        $user->save();

        $users = Module::where('name', 'users')->firstOrNew();
        $users->fill([
            'display_name' => 'Users',
            'create' => 1,
            'read' => 1,
            'update' => 1,
        ]);
        $users->parent()->associate($user);
        $users->save();
    }
}
