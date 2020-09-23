import { SET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./todo.actions";

export const todoReducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_TODOS:
      return { ...state, todos: data };

    case ADD_TODO:
      const todos = {
        ...state.todos,
        [data.id]: { description: data.description },
      };
      return { ...state, todos };

    case DELETE_TODO:
      const todosdelete = { ...state.todos };
      delete todosdelete[data];
      return { ...state, todos: todosdelete };

    case UPDATE_TODO:
      const todosupdate = { ...state.todos };
      return { ...state, todosupdate };

    default:
      return state;
  }
};
