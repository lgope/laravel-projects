<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    protected $fillable = ['userId', 'name', 'description', 'status'];
}
