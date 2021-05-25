<?php

namespace Database\Seeders;

use App\Models\Impfung;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // test user
        $user = new \App\Models\User();
        $user->gender = 'w';
        $user->firstname = 'testuser3';
        $user->lastname = 'Pick';
        $user->birthdate = 12032000;
        $user->SVN = 123456;
        $user->email = 'test@gmail3.com';
        $user->password = bcrypt('secret');
        $user->isVaccinated = '1';
        $user->isAdmin = '0';



        // IMPFUNG
      //  $vac = Impfung::all()->first();
        //$user->impfung()->associate($vac);

       // $user->save();
    }
}
