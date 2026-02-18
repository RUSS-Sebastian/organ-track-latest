<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Organ;

class OrganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Organ::insert([
        ['name' => 'Heart', 'gender' => 'common'],
        ['name' => 'Brain', 'gender' => 'common'],
        ['name' => 'Lungs', 'gender' => 'common'],
        ['name' => 'Liver', 'gender' => 'common'],
        ['name' => 'Kidney', 'gender' => 'common'],
        ['name' => 'Stomach', 'gender' => 'common'],
        ['name' => 'Muscles', 'gender' => 'common'],
        ['name' => 'Intestine', 'gender' => 'common'],
        ['name' => 'Gall Bladder', 'gender' => 'common'],
        ['name' => 'Pancreas', 'gender' => 'common'],
        ['name' => 'Skin', 'gender' => 'common'],
        ['name' => 'Bladder', 'gender' => 'common'],
        ['name' => 'Blood Vessels', 'gender' => 'common'],
        ['name' => 'Bone', 'gender' => 'common'],
        ['name' => 'Prostate', 'gender' => 'male'],
        ['name' => 'Uterus', 'gender' => 'female'],
    ]);
    }
}
