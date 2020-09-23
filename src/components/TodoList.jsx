import React, { useContext, useState, useEffect } from "react";
import { Input, Button } from "antd";
import { TodoContext } from "../context/TodoContextProvider";
import { deleteTodo, updateTodo, setTodos } from "../context/todo.actions";
import { firebaseApi } from "../services/firebaseApi";

const TodoTask = (props) => {
  return (
    <div className="todo-task">
      <div className="todo-task__name" data-cy="todo-task__name">
        {props.description}
      </div>
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-update"
        onClick={() => {}}
      >
        Update
      </Button>
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-delete"
        onClick={() => props.delete(props.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export const TodoList = () => {
  const { dispatch, state } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await firebaseApi.fetchTodos();
      dispatch(setTodos(todos));
    }

    fetchTodos();
  }, [dispatch]);

  const handleDeleteTodo = (id) => {
    firebaseApi.deleteTodo(id);
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, description) => {
    dispatch(updateTodo(id, description));
  }

  return (
    <div className="todo-list" data-cy="todo-list">
      {Object.entries(state.todos).map(([id, todo]) => (
        <TodoTask
          key={id}
          description={todo.description}
          update={handleUpdateTodo}
          delete={handleDeleteTodo}
          id={id}
        />
      ))}
    </div>
  );
};
