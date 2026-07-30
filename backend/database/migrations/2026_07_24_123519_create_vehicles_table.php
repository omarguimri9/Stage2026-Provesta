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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('marque');
            $table->string('modele');
            $table->integer('annee');
            $table->string('immatriculation')->unique();
            $table->decimal('prix_par_jour', 10, 2);
            $table->boolean('disponible')->default(true);
            $table->string('couleur')->nullable();
            $table->string('carburant');
            $table->string('transmission');
            $table->integer('nombre_places')->nullable();
            $table->integer('kilometrage')->nullable();
            $table->text('description')->nullable();
            $table->foreignId('categorie_id')->constrained('categories')->onDelete('restrict');
            $table->foreignId('agency_id')->constrained('agencies')->onDelete('restrict');
            $table->timestamps();
        });
    
   
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
