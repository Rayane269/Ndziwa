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
        Schema::create('users', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('avatar')->nullable();
            $table->string('nom');
            $table->string('prenom');
            $table->string('nin')->nullable()->unique();
            $table->string('type')->default('particulier');
            $table->string('telephone')->unique();
            $table->timestamp('telephone_verified_at')->nullable();
            $table->string('password');
            $table->json('roles')->default(new Expression('(JSON_ARRAY())'))->comment('DC2Type:json');
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
};
