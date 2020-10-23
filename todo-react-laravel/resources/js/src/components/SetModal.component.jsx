import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    ModalFooter
} from "reactstrap";
import { selectTodos } from "../redux/todoSlice";
import { newTodo, modifyTodos } from "../redux/todoActions";

const SetModal = ({
    title,
    buttonIcon = null,
    buttonLabel = null,
    saveFunc,
    todoId = null,
    name = null,
    description = null
}) => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newDes, setNewDes] = useState(description);

    const toggle = () => setModal(!modal);

    const handleTextFieldChange = (mySetFunction, event) => {
        console.log(event.target.value);
        mySetFunction(event.currentTarget.value);
    };

    const saveNewTodo = e => {
        e.preventDefault();
        dispatch(
            newTodo({ userId: todos.user, name: newName, description: newDes })
        );
    };

    const updateToDo = e => {
        e.preventDefault();
        dispatch(modifyTodos(todoId, { name: newName, description: newDes }));
    };

    return (
        <Fragment>
            {buttonLabel ? (
                <Button outline color="primary" title={title} onClick={toggle}>
                    {buttonLabel}
                </Button>
            ) : (
                <Button
                    color="white"
                    size="sm"
                    title={title}
                    className="mr-2"
                    onClick={toggle}
                >
                    <img src={buttonIcon} alt="Icon" />
                </Button>
            )}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal</ModalHeader>
                <Form>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Todo name"
                                defaultValue={name}
                                onChange={event =>
                                    handleTextFieldChange(setNewName, event)
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Todo description"
                                defaultValue={description}
                                onChange={event =>
                                    handleTextFieldChange(setNewDes, event)
                                }
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={
                                saveFunc === "saveNewTodo"
                                    ? saveNewTodo
                                    : updateToDo
                            }
                        >
                            Save
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    );
};

export default SetModal;
