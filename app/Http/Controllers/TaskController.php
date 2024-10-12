<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $query = Task::query();
        //^ sorted content and defaults on intial load or if not provided
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        //^ if the request has a name in it, we want to filter by that name
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        //^ if the request has a status in it, we want to filter by that status
        if (request("status")) {
            $query->where("status", request("status"));
        }
        // $tasks = $query->paginate(6);
        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);


        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success'=> session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();

        return to_route("task.index")
            ->with("success", "Task\"$name\" was deleted");
    }
}
