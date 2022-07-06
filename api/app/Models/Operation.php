<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    use HasFactory;

    public function compte() {
        return $this->belongsTo(Compte::class);
    }

    public function responsable() {
        return $this->belongsTo(User::class, 'responsable_id', 'id');
    }
}
