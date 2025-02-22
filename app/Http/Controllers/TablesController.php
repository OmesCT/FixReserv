<?php

namespace App\Http\Controllers;

use App\Models\Tables;
use Illuminate\Http\Request;

class TablesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return Inertia::render('Shabu/Reserve', [
            'tables' => Table::all(), // ตรวจสอบว่า Table::all() มีข้อมูลหรือไม่
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tables $tables)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tables $tables)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tables $tables)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tables $tables)
    {
        //
    }
    public function reserve(Request $request, Table $table)
    {
        if ($table->available) {
            $table->update([
                'available' => false,
                'reserved_by_user_id' => auth()->id(),
            ]);
        }
        return redirect()->route('tables.index');
    }

}
