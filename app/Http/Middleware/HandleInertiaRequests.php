<?php

namespace App\Http\Middleware;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => fn() =>
                // ...Auth::user(),
                Auth::check() ? User::where('id', Auth::user()->id)->with('role')->first() : null,
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'layoutValue' => fn() => [
                'layoutType' => 'vertical',
                'layoutWidth' => 'fluid',
                'sidebarSize' => 'lg',
                'topbar' => 'light',
                'mode' => 'light',
                'position' => 'fixed',
                'sidebarView' => 'default',
                'sidebarColor' => 'light',
                'sidebarImage' => 'none',
                'preloader' => 'disable',
                'visibility' => 'show'
            ]
        ];
    }
}
