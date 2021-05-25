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
        // User::factory(10)->create();

        // Reihnfolge wichtig

        // VACINASTABLE

        $this->call(OrtTableSeeder::class);
        $this->call(ImpfungTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        //test
    }
}
