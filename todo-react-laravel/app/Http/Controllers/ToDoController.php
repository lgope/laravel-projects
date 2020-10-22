<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ToDo;
use Illuminate\Support\Facades\Storage;

class ToDoController extends Controller
{
    // retrive all data
    public function allTodo()
    {
        $userId = Storage::exists('userId') ? Storage::get('userId') : null;
        $data = ToDo::where('userId', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        return $userId ? ['user' => $userId, 'data' => $data] : ['data' => null];
    }

    public function storeTodo(Request $request)
    {
        $newTodo = ToDo::create($request->all());
        error_log($newTodo);

        // refreshing newTodo data for get default values.
        $newTodo = $newTodo->refresh();
        return $newTodo;
    }

    public function updateTodo(Request $request, $id)
    {
        $todo = ToDo::findOrFail($id);
        $todo->update($request->all());
        return $todo;
    }

    public function deleteTodo($id)
    {
        $todo = ToDo::findOrFail($id);
        $todo->delete();
        return 204;
    }
}

//! get() vs all() 
// all() is a static method on the Eloquent\Model. All it does is create a new query object and call get() on it. With all(), you cannot modify the query performed at all (except you can choose the columns to select by passing them as parameters)
// get() is a method on the Eloquent\Builder object. If you need to modify the query, such as adding a where clause, then you have to use get(). For example, User::where('name', 'David')->get();