<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   
    public function up(): void
    {
        Schema::create('reservation', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('restrict')->onUpdate('cascade');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->decimal('montant_total', 10, 2);
            $table->string('mode_paiement')->nullable();
            $table->enum('statut_paiement', ['en_attente', 'paye', 'rembourse'])->default('en_attente');
            $table->enum('statut', ['en_attente', 'confirmee', 'annulee', 'terminee'])->default('en_attente');
            $table->string('lieu_prise_en_charge')->nullable();
            $table->string('lieu_retour')->nullable();
            $table->timestamps();
        });
    }
   

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};
