<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
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
        Schema::create('groups', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('objectif');
            $table->foreignId('user_admin')->constrained('users');
            $table->timestamp('date_debut_souhaite');
            $table->integer('round')->default(1);
            $table->timestamps();
        });

        Schema::create('group_user', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->foreignId('group_id')->nullable()->constrained('groups');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->timestamp('date_collecte')->nullable();
            $table->integer('rang')->nullable();
            $table->boolean('invitation_accepted')->default(false);
            $table->boolean('paid')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groups');
    }
};
