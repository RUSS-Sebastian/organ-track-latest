<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Track>
 */
class TrackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $organs = ['Heart', 'Liver', 'Kidney', 'Lung', 'Brain' , 'Stomach', 'Muscle', 'Intestine', 'Gall Bladder', 'Pancreas', 'Skin', 'Bladder', 'Blood Vessels', 'Bone', 'Prostate', 'Uterus'];
        return [
            'user_id' => 1, 
            'name' => $this->faker->word . ' Check', // e.g., "Heart Check"
            'organ' => $organs[array_rand($organs)],
            'date' => $this->faker->date(), 
        ];
    }
}
