import axios from "axios";
import {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    setUser
} from "./todoSlice";

// get / read
export const fetchTodos = () => dispatch => {
    axios
        .get("/api/todos")
        .then(res => {
            dispatch(getAllTodos(res.data.data));
            dispatch(setUser(res.data.user));
        })
        .catch(err => console.log(err));
};

// add / create
export const newTodo = body => dispatch => {
    axios
        .post("/api/todo", body)
        .then(res => {
            dispatch(addTodo(res.data));
        })
        .catch(err => console.log(err));
};

// remove / delete
export const removeTodo = id => dispatch => {
    axios
        .delete(`/api/todo/${id}`)
        .then(res => dispatch(deleteTodo(id)))
        .catch(err => console.log(err));
};

// update
export const modifyTodos = (id,body) => dispatch => {
    axios
        .put(`/api/todo/${id}`, body)
        .then(res => dispatch(updateTodo(res.data)))
        .catch(err => console.log(err));
};
