import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Button, Modal } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos } from "../redux/todoSlice";
import { fetchTodos, modifyTodos, removeTodo } from "../redux/todoActions";
import Moment from "react-moment";
// icons
import checkedIcon from "../../../images/checked.png";
import editIcon from "../../../images/edit-tool.png";
import deleteIcon from "../../../images/trash.png";

import SetModal from "./SetModal.component";

const ToDosTable = () => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    let count = 1;
    let textStyle = "done-todo-name done-todo-description";
    console.log(todos);
    useEffect(() => {
        dispatch(fetchTodos());
    }, [fetchTodos]);

    let rowsData = [];

    // storing users data in rows data
    todos.data &&
        todos.data.forEach(todo =>
            rowsData.push({
                countNum: count++,
                name:
                    todo.status === "done" ? (
                        <del className="text-success">{todo.name}</del>
                    ) : (
                        todo.name
                    ),
                description:
                    todo.status === "done" ? (
                        <>
                            <del className="text-success">
                                {todo.description.length >= 55
                                    ? todo.description.substr(0, 55) + "..."
                                    : todo.description}
                            </del>
                            <span className="badge bg-theme ml-3">Done</span>
                        </>
                    ) : (
                        <>
                            {todo.description.length >= 55
                                ? todo.description.substr(0, 55) + "..."
                                : todo.description}
                            <span className="badge bg-theme-time ml-3">
                                <Moment fromNow>{todo.created_at}</Moment>
                            </span>
                        </>
                    ),
                action: (
                    <>
                        <Button
                            color="white"
                            size="sm"
                            title="Done"
                            className="mr-2"
                            onClick={() =>
                                onStatusUpdate(todo.id, {
                                    status:
                                        todo.status === "ongoing"
                                            ? "done"
                                            : "ongoing"
                                })
                            }
                        >
                            <img src={checkedIcon} alt="checked Icon" />
                        </Button>
                        <SetModal
                            title="Edit"
                            todoId={todo.id}
                            buttonIcon={editIcon}
                            name={todo.name}
                            description={todo.description}
                            saveFunc="updateTodo"
                        />

                        <Button
                            color="white"
                            size="sm"
                            title="Delete"
                            className="mr-2"
                            onClick={e => onDeleteBtnClick(e, todo.id)}
                        >
                            <img src={deleteIcon} alt="delete Icon" />
                        </Button>
                    </>
                )
            })
        );

    const data = {
        columns: [
            {
                label: "#",
                field: "countNum"
            },
            {
                label: "Name",
                field: "name"
            },
            {
                label: "Description",
                field: "description"
            },
            {
                label: "Action",
                field: "action",
                width: 300
            }
        ],
        rows: rowsData
    };

    const onDeleteBtnClick = (e, id) => {
        e.preventDefault();
        dispatch(removeTodo(id));
    };

    const onStatusUpdate = (todoId, body) => {
        console.log("hello... ", todoId, body);
        dispatch(modifyTodos(todoId, body));
    };
    return (
        <div className="container">
            <SetModal
                buttonLabel="Add New"
                title="Add New Todo"
                saveFunc="saveNewTodo"
            />

            {rowsData.length > 0 ? (
                // <MDBDataTable bordered small data={data} />
                <ol className="gradient-list">
                    {todos.data.map(todo => (
                        <li className="hvr-bubble-float-bottom" key={todo.id}>
                            <div
                                className={
                                    todo.status === "done"
                                        ? "todo-todo-name"
                                        : "todo-name"
                                }
                            >
                                <span>{todo.name}</span> | {"   "}
                            </div>
                            <div
                                className={
                                    todo.status === "done"
                                        ? "todo-todo-description"
                                        : " description"
                                }
                            >
                                {todo.description.length >= 55
                                    ? todo.description.substr(0, 55) + "..."
                                    : todo.description}
                                <span className="badge bg-theme-time ml-3">
                                    <Moment fromNow>{todo.created_at}</Moment>
                                </span>
                            </div>

                            <div className="action-buttons">
                                <Button
                                    color="white"
                                    size="sm"
                                    title="Done"
                                    className="ml-2 mr-2 button"
                                    onClick={() =>
                                        onStatusUpdate(todo.id, {
                                            status:
                                                todo.status === "ongoing"
                                                    ? "done"
                                                    : "ongoing"
                                        })
                                    }
                                >
                                    <img src={checkedIcon} alt="checked Icon" />
                                </Button>
                                <SetModal
                                    title="Edit"
                                    todoId={todo.id}
                                    buttonIcon={editIcon}
                                    name={todo.name}
                                    description={todo.description}
                                    saveFunc="updateTodo"
                                />

                                <Button
                                    color="white"
                                    size="sm"
                                    title="Delete"
                                    className="mr-2 delete-button button"
                                    onClick={e => onDeleteBtnClick(e, todo.id)}
                                >
                                    <img src={deleteIcon} alt="delete Icon" />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ol>
            ) : (
                <h2 className="mt-4">No todo added yet! 🤷‍♂️</h2>
            )}
        </div>
    );
};
export default ToDosTable;
