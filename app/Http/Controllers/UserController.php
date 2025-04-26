<?php

namespace App\Http\Controllers;

use App\Helpers\EditResponseHelper;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserForm;
use App\Http\Requests\UserPermissionForm;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Modules\UserModule;
use App\Modules\UserPermissionModule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perpage = $request->perpage ?? 10;
        $search = $request->search;
        $orderBy = $request->order_by;
        $sort = $request->sort;
        $data = User::with('role')->when(!is_null($search), function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")->orWHere('email', 'like', "%$search%");
            });
        })->when(is_null($orderBy), function ($query) {
            $query->orderBy('id', 'asc');
        })->when(!is_null($orderBy), function ($query) use ($sort, $orderBy) {
            $query->orderBy($orderBy, $sort);
        })->paginate($perpage)->onEachSide(0);
        return Inertia::render('User/UserIndex', ['users' => $data]);
        // return Inertia::render('User/UserIndex', ['users' => UserResource::make($data)]);
    }
    public function show($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('User/UserDetail', props: ['user' => $user]);
    }
}
