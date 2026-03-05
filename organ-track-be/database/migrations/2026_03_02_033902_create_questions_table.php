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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->enum('category_type', ['Daily', 'Symptom']);
            $table->foreignId('organ_id')
                  ->nullable()
                  ->constrained('organs')
                  ->nullOnDelete(); 
            $table->text('question_text_en');
            $table->text('question_text_mm');

            $table->enum('question_type', ['single', 'multiple']);

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
