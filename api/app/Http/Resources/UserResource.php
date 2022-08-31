<?php

namespace App\Http\Resources;

use App\Models\Region;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "nom" => $this->nom,
            "prenom" => $this->prenom,
            "avatar" => $this->avatar,
            "nin" => $this->nin,
            "type" => $this->type,
            "telephone" => $this->telephone,
            "roles" => $this->roles,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "region" => Region::find($this->region_id),
            "account" => $this->compte,
        ];
    }
}
