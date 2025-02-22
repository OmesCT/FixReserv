<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservations extends Model
{
    use HasFactory;
    protected $table = 'reservations';
    protected $fillable = ['table_id', 'customer_id', 'employee_id', 'reservation_date', 'reservation_time', 'number_of_people', 'status_id'];

    public function table()
    {
        return $this->belongsTo(Tables::class, 'table_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customers::class, 'customer_id');
    }


    public function reservationStatus()
    {
        return $this->belongsTo(Reservation_statuses::class, 'status_id');
    }
}
