<?php

namespace App\Http\Controllers;

use App\Models\Reservations;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use App\Models\Customer;
use App\Models\Table;

class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservations::all();
        return Inertia::render('Shabu/Reserve', ['reservations' => $reservations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Shabu/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'table_id' => 'required|exists:tables,id',
        ]);
    
        // บันทึกข้อมูลลูกค้า
        $customer = Customer::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);
    
        // อัปเดตสถานะโต๊ะ
        Table::where('id', $request->table_id)->update([
            'available' => false,
            'reserve_by_id' => $customer->id,
        ]);
    
        // รีโหลดหน้า Reserve พร้อมข้อมูลใหม่
        return redirect()->route('reserve')->with('success', 'จองโต๊ะสำเร็จ!');
    }

    public function reserveTable(Request $request)
    {
        $table_id = $request->input('table_id'); // รับค่า table_id จาก request
    
        if ($table_id) {
            // ตรวจสอบว่า table_id นั้นมีอยู่ในตาราง tables
            $table = Table::find($table_id);
            if ($table) {
                // อัปเดตสถานะโต๊ะที่ถูกจอง
                $table->update([
                    'available' => 0,
                    'reserved_by_user_id' => auth()->user()->id, // ใช้ user_id ของผู้ที่จองโต๊ะ
                ]);
    
                return redirect()->route('reserve.index'); // กลับไปที่หน้าเลือกโต๊ะ
            }
        }
    
        return redirect()->route('reserve.index')->withErrors(['error' => 'ไม่พบโต๊ะ']);
    }
    
    

    
    /**
     * Display the specified resource.
     */
    public function show(Reservations $reservations)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservations $reservations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservations $reservations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservations $reservations)
    {
        //
    }
}
