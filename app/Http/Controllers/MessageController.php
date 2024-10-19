<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->id())->get();

        return Inertia::render('Messages/Index', ['users' => $users]);
    }

    public function show(User $user)
    {
        $messages = $this->getMessages($user);

        return Inertia::render('Messages/Show', [
            'user' => $user,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request, User $user)
{
    $validatedData = $request->validate([
        'content' => 'required|string',
    ]);

    $message = Message::create([
        'sender_id' => auth()->id(),
        'recipient_id' => $user->id,
        'content' => $validatedData['content'],
    ]);

    $messageWithSender = $message->load('sender');

    broadcast(new MessageSent($messageWithSender))->toOthers();

    return response()->json([
        'message' => $messageWithSender,
        'status' => 'success'
    ], 201);
}

    private function getMessages(User $user)
    {
        return Message::where(function ($query) use ($user) {
            $query->where('sender_id', auth()->id())
                ->where('recipient_id', $user->id);
        })->orWhere(function ($query) use ($user) {
            $query->where('sender_id', $user->id)
                ->where('recipient_id', auth()->id());
        })->orderBy('created_at', 'asc')->get();
    }
}
