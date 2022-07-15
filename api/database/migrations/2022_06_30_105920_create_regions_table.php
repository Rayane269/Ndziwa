<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('nom');
            $table->string('code');
            $table->string('code_appel')->nullable();
            $table->string('devise')->default("USD");
            $table->string("flag");
            $table->json('timezone')->default(new Expression('(JSON_ARRAY())'))->comment('DC2Type:json');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('region_id')->constrained('regions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('regions');
    }
};
