<?php

use App\Http\Controllers\CreateController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\TablesController;
use App\Http\Controllers\ProfileController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/reserve', [TablesController::class, 'index'])->name('reserve.index');
    Route::resource('customers', CustomersController::class);
    Route::post('/tables/{table}/reserve', [TablesController::class, 'reserve'])->name('tables.reserve');
    Route::post('/customers', [CustomersController::class, 'store']);
    Route::get('/create', [CreateController::class, 'showCreateForm'])->name('create');
    Route::patch('/api/tables/{id}/reserve', [TablesController::class, 'reserve']);
    Route::get('/customers/create', [CustomersController::class, 'create'])->name('customers.create');
    Route::post('/customers', [CustomersController::class, 'store'])->name('customers.store');
    Route::post('/reserve-table', [ReservationsController::class, 'reserveTable']);


});

require __DIR__.'/auth.php';