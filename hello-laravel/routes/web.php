<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
    // return response()->json([
    //     'name' => 'Lakshman',
    //     'state' => 'CA',
    // ]);
});


Route::get('/about', function () {
    return view('about');
})->middleware('ipcheck', 'checkuser');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
