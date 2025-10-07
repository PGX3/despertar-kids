<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Events/Index', [
            'events' => Event::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
        Event::create($request->validate([
            'title' => 'required|string',
            'event_date' => 'required|date',
            'type' => 'nullable|string',
            'description' => 'nullable|string'
        ]));

        return redirect()->route('events.index');
    }
}
