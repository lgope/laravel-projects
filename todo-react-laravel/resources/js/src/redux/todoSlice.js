import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        data: '',
        user: null,
        isLoading: true
    },
    reducers: {
        addTodo: (state, action) => {
            state.data.unshift(action.payload);
            state.isLoading = false;
        },

        deleteTodo: (state, action) => {
            state.data = state.data.filter(todo => todo.id !== action.payload);
            state.isLoading = false;
        },

        updateTodo: (state, action) => {
            state.data = state.data.map(todo =>
                todo.id === action.payload.id ? { ...action.payload } : todo
            );
            state.isLoading = false;
        },

        getAllTodos: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const {
    addTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
    setUser
} = todoSlice.actions;

export const selectTodos = state => state.todos;

export default todoSlice.reducer;
