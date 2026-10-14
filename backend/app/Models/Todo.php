<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
    'title',
    'description',
    'is_completed',
    'priority',
    'due_date',
    'category',
];

    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
            'due_date' => 'date:Y-m-d',
        ];
    }
}