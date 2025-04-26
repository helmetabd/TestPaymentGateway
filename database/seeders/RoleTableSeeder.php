<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'role' => "Super Admin",
                'color' => "#E8593F",
                "permission" => [
                    [
                        'module' => 'user',
                        'module_id' => 1,
                        'create' => 0,
                        'read' => 1,
                        'update' => 0,
                    ],
                    [
                        'module' => 'user.users',
                        'module_id' => 2,
                        'create' => 1,
                        'read' => 1,
                        'update' => 1,
                    ]
                ]
            ],
            [
                'role' => "Admin",
                "color" => "#B06BFF",
                "permission" => [
                    [
                        'module' => 'user',
                        'module_id' => 1,
                        'create' => 0,
                        'read' => 1,
                        'update' => 0,
                    ],
                    [
                        'module' => 'user.users',
                        'module_id' => 2,
                        'create' => 1,
                        'read' => 1,
                        'update' => 1,
                    ]
                ]
            ],
            ['role' => "User", "color" => "#47E84B", "permission" => null]
        ];
        foreach ($roles as $role) {
            $r = Role::where(column: 'display_name', operator: $role['role'])->first();
            if (is_null($r)) {
                $r = new Role();
            }
            $r->fill([
                'display_name' => $role['role'],
                'color' => $role['color'],
                'permissions' => $role['permission'],
            ]);
            $r->save();
        }
    }
}
