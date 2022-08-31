<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    public function members() {
        return $this->belongsToMany(User::class)->withPivot('paid', 'invitation_accepted', 'rang', 'date_collecte');
    }

    public function memberAdmin() {
        return $this->belongsTo(User::class, 'user_admin', 'id');
    } 

    public function frequence() {
        return $this->belongsTo(Frequence::class);
    }

    public function etat() {
        return $this->belongsTo(Etat::class);
    }

    public function montant() {
        return $this->belongsTo(Montant::class);
    }
}
