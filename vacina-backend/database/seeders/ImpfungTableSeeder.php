<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Seeder;

class ImpfungTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $vacina = new \App\Models\Impfung;
        $vacina->title = "Herr der Ringe";
        $vacina->date = new DateTime();
        $vacina->description = "Letzter Teil der Trilogie";
        $vacina->MaxMember = 40;
        $vacina->appointment = "Der Impftermin";




        // ORT
        $place = \App\Models\Ort::all()->first();

        $vacina->ort()->associate($place);


        // first user
        //$user = \App\Models\User::all()->first();
        // $vacina->user()->associate($user);

       $vacina->save();
    }
}
