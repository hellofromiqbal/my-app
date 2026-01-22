import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  createdAt: string;
  isDone: boolean;
};

interface todosState {
  value: Todo[];
};

const initialState: todosState = {
  value: []
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    allTodos: (state, action: PayloadAction<Todo[]>) => {
      state.value = action.payload;
    },
    addNewTodo: (state, action: PayloadAction<Todo>) => {
      state.value.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(todo => todo.id !== action.payload);
    },
    toggleTodoStatus: (state, action: PayloadAction<string>) => {
      const todo = state.value.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    }
  }
});

export const { allTodos, addNewTodo, deleteTodo, toggleTodoStatus } = todosSlice.actions;
export default todosSlice.reducer;