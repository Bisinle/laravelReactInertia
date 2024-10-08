<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'due_date',
        'status',
        'image_path',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',



    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
