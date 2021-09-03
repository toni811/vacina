<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImpfungsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('impfungs', function (Blueprint $table) {
            $table->id();

            // wie isbn nei Buch
            $table->string('title')->unique();
            $table->date('date');
            $table->text('description')->nullable();
            // Anzahl Teilnehmer
            $table->integer('MaxMember')->default('10');
            $table->text('appointment')->nullable();

            //ORT
            // FK BEZIEHUNG
            $table->foreignId('ort_id')->constrained()->onDelete('cascade');


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
        Schema::dropIfExists('impfungs');
    }
}
