<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CreateController extends Controller
{
    public function showCreateForm(Request $request)
    {
        return Inertia::render('Shabu/Create', [
            'table_id' => $request->query('table_id'),
        ]);
    }
}