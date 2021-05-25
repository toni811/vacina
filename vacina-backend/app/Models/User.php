<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;



class User extends Authenticatable  implements JWTSubject
{
    use HasFactory, Notifiable;

    //////////////////////////////////////////////////////////////////
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'gender','firstname','lastname', 'birthdate','SVN', 'email', 'password','isVaccinated','impfungs_id',
        'isAdmin'

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
/////////////////////////////////////////////////////////////////////
// IMPFUNG
    /**
     * user has one vaccination
     * @return HasMany
     */
    public function impfung() : BelongsTo
    {
        return $this->belongsTo(Impfung::class);
    }


 //////////////////////////// FÜR LOGIN
    ///

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    // TOKEN werden Daten mitgegeben, hier die id-> kann auch mehr sein
    public function getJWTCustomClaims() {
        return ['user' => ['id' => $this->id, "isAdmin" => $this->isAdmin]];
    }

}
