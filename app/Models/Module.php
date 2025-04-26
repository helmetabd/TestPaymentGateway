<?php

namespace App\Models;

use App\Traits\DisplayNameTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory, DisplayNameTrait;

    protected $fillable = [
        'name',
        'display_name',
        'create',
        'read',
        'update',
    ];

    public $timestamps = false;

    public function parent(){
        return $this->belongsTo(Module::class, 'parent_id', 'id');
    }

    public function childs(){
        return $this->hasMany(Module::class, 'parent_id', 'id');
    }
}
