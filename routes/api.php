<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UserController::class)
        ->prefix('user')->as('user.')
        ->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/{id}', 'show')->name('show');
        });
    Route::controller(PaymentController::class)
        ->prefix('payment')->as('payment.')
        ->group(function () {
            Route::post('/', 'store')->name('store');
        });
});