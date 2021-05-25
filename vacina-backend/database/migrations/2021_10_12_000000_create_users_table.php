<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // REIHENFOLGE WICHTIG
            $table->string('gender')->default('w/m/d');
            $table->string('firstname');
            $table->string('lastname');
            $table->integer('birthdate')->default('00');
            $table->integer('SVN')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // Impfung verabreicht ja/Nein -->
            $table->boolean('isVaccinated')->default('0');
            //IMPGUNG FK
            $table->foreignId('impfung_id')->nullable();
            //FLAG für Administrator/Impfwillige
            $table->boolean('isAdmin')->default('0');
            $table->rememberToken();
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
