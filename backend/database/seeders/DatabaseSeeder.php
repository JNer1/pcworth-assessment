<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Product::insert([
            ['name' => 'Wooting 60HE', 'price' => 11950, 'stock' => 10],
            ['name' => 'Ninjutso Sora V2', 'price' => 5750, 'stock' => 25],
            ['name' => 'RX 9060 XT', 'price' => 24750, 'stock' => 5],
        ]);
    }
}
