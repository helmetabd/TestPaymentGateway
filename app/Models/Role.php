<?php

namespace App\Models;

use App\Traits\DisplayNameTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use DisplayNameTrait;
    protected $fillable = [
        "name",
        "display_name",
        "color",
    ];
    public function permissions(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => json_encode($value, JSON_UNESCAPED_UNICODE),
            get: fn ($value) => json_decode($value)
        );
    }
    public function users(){
        return $this->hasMany(User::class);
    }
}
