<?php

namespace App\Models;

use App\Models\Group;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Etat extends Model
{
    use HasFactory;

    public function groups() {
        return $this->hasMany(Group::class);
    }
}
