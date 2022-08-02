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

    public function emit() {
        return $this->belongsTo(User::class, 'emetteur', 'id');
    }

    public function accredit() {
        return $this->belongsTo(User::class, 'beneficiaire', 'id');
    }

    public function deposit() {
        return $this->belongsTo(User::class, 'agent', 'id');
    }
}
