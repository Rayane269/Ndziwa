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
        Schema::create('comptes', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('numero_compte')->nullable();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->float('bourse', 11, 2)->default(0);
            $table->boolean('activated')->default(false);
            $table->timestamp('activated_at')->nullable();
            $table->string('type')->nullable();
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
        Schema::dropIfExists('comptes');
    }
};
