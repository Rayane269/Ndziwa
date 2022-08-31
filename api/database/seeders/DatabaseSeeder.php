<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $frequences = [
            "journaliere",
            "hebdomadaire",
            "mensuelle",
            "annuelle"
        ];

        $montants = [
            25000,
            50000,
            75000,
            100000,
            150000,
            250000,
            1000000
        ];

        $etats = [
            "waiting",
            "progressing",
            "finished"
        ];

        foreach ($frequences as $v) {
            # code...
            \App\Models\Frequence::factory()->create([
                'libelle' => $v
            ]);
        }

        foreach ($montants as $v) {
            \App\Models\Montant::factory()->create([
                "prix" => $v
            ]);
        }

        foreach ($etats as $v) {
            \App\Models\Etat::factory()->create([
                "nom" => $v
            ]);
        }

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
