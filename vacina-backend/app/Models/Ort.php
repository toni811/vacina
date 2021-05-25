<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ort extends Model
{
    use HasFactory;

// define all properties that should be writable
    protected $fillable = [ 'PLZ', 'location',
        'description', 'address', 'date'];



    /**
     * book has many images
     *  Place hat viel Vacinas
     * die N Seite
     */
    public function impfungen() : HasMany
    {
        return $this->hasMany(Impfung::class);
    }

}
