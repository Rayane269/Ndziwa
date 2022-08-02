<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('operations', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->foreignId('compte_id')->constrained('comptes');
            $table->foreignId('emetteur')->nullable()->constrained('users');
            $table->foreignId('beneficiaire')->nullable()->constrained('users');
            $table->foreignId('agent')->nullable()->constrained('users');
            $table->float('somme', 11);
            $table->string('libelle')->nullable();
            $table->string('type_operation', 50);
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
        Schema::dropIfExists('journals');
    }
};
