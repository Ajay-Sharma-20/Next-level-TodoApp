<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Todo::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
    'title' => 'required|string|max:255',
    'description' => 'nullable|string',
    'is_completed' => 'sometimes|boolean',
    'priority' => 'sometimes|in:high,medium,low',
    'due_date' => 'sometimes|nullable|date_format:Y-m-d',
    'category' => 'sometimes|nullable|string|max:100',
]);

        $todo = Todo::create($validated);

        return response()->json($todo, 201);
    }

    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    public function update(Request $request, Todo $todo)
    {
       $validated = $request->validate([
    'title' => 'sometimes|required|string|max:255',
    'description' => 'sometimes|nullable|string',
    'is_completed' => 'sometimes|boolean',
    'priority' => 'sometimes|in:high,medium,low',
    'due_date' => 'sometimes|nullable|date_format:Y-m-d',
    'category' => 'sometimes|nullable|string|max:100',
]);

        $todo->update($validated);

        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully',
        ]);
    }
}
