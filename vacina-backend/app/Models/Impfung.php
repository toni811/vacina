<?php


// PUSH
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Impfung extends Model
{
    use HasFactory;

   // protected $fillable = [ 'title', 'date',
      //  'description', 'MaxMember','appointment', 'ort_id', 'user_id'];

    protected $fillable = [ 'title', 'date',
        'description', 'MaxMember','appointment','user_id'];


// ORT
    public function ort() : BelongsTo {
        return $this->belongsTo(Ort::class);
    }

// USER
    public function users() : HasMany
    {
        return $this->hasMany(User::class);
    }


}
