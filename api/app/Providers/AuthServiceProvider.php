<?php

namespace App\Providers;

use App\Models\Group;
use App\Models\User;
use App\Policies\GroupPolicy;
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
        Group::class => GroupPolicy::class
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

        Gate::define('register-next-step', function (?User $user, Session $session) {
            $register = $session->get('register', []);
            return key_exists($register['lastStep'], $session->get('register.steps') ?? []);
        });

        Gate::define('transaction-next-step', function (User $user, Session $session) {
            $register = $session->get('transaction', []);
        });
    }
}
