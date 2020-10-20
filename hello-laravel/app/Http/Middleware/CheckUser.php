<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request = null, Closure $next = null, $email = null)
    {
        if ($request->user()->email == $email) {
            return redirect('/');
        }

        return $next($request);
    }

    public function terminate($req, $res)
    {
        file_put_contents(__DIR__ . '/abc.txt', 'Hello world from teminate method');
    }
}
