<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $project = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($project),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        /**@var $image \Illuminate\Http\UploadedFile */
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('tasks/' . Str::random(), 'public');
        }

        // dd($request->all());
        Task::create($data);
        return to_route('task.index')
            ->with('success', 'Task ' . $data['name'] . ' was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $project = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($project),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        // dd($data);
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route('task.index')
            ->with('success', "task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();

        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route("task.index")
            ->with("success", "Task\"$name\" was deleted");
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
