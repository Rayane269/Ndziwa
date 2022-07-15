<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Contracts\Session\Session;
use Illuminate\Contracts\Session\Session as SessionSession;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define(
            'transaction-argent', 
            fn (User $user) => in_array('ROLE_ADMIN', json_decode($user->roles))
        );

        Gate::define('next-step', function (?User $user, Session $session) {
            $register = $session->get('register', []);
            return key_exists($register['lastStep'], $session->get('register.steps') ?? []);
        });
    }
}
