<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'due_date',
        'status',
        'priority',
        'image_path',
        'assigned_user_id',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    public function Project()
    {
        return $this->belongsTo(Project::class);
    }
}
