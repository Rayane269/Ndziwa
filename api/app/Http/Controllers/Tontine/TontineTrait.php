<?php

namespace App\Http\Controllers\Tontine;

use App\Models\User;
use App\Models\Group;
use Illuminate\Http\Request;

trait TontineTrait {

    public function __construct(private Request $request) {}

    /**
     * supprimer un membre sur le groupe
     *
     * @param  User $user
     * @param Group $group
     * @return void
     */
    public function detachUserOfGroup(User $user, Group $group) {
        $roles = json_decode($user->roles);
        //recuperer l'index du role à supprimer
        $key = array_keys($roles, "ROLE_MEMBER_GROUP_$group->id", true)[0];
        unset($roles[$key]);
        $user->roles = json_encode($roles);
        $user->save();
        $group->members()->detach($user->id);
    }
}