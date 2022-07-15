<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Region>
 */
class RegionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return 
        [
            'nom' => 'Comores',
            'code' => 'km',
            'code_appel' => '+269',
            'devise' => 'KMF',
            'timezone' => 'UTC+03:00'
        ]
        /*
        [
            'nom' => 'France',
            'code' => 'fr',
            'code_appel' => '+33',
            'devise' => '€',
            'timezone' => null
        ]
        **/
        ;
    }
}
