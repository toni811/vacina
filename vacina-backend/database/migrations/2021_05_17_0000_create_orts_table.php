<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orts', function (Blueprint $table) {
            // auf default gegeben
           // $table->id();
            //
            $table->bigIncrements('id');

            //
            $table->integer('PLZ')->default('1080');
            $table->string('location');
            $table->string('address')->unique();
            $table->text('description')->nullable();
            $table->date('date');

            //
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
        Schema::dropIfExists('orts');
    }
}
