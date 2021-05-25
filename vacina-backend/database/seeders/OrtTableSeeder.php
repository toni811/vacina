<?php

namespace Database\Seeders;
use DateTime;
use Illuminate\Database\Seeder;

class OrtTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $place = new \App\Models\Ort;
        $place->PLZ = 8010;
        $place->location = "Graz";
        $place->address = "Tirolergasse";
        $place->description = "Stiege 3";
        $place->date = new DateTime();

        $place->save();



    }
}
