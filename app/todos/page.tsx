'use client';

import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addNewTodo, allTodos, deleteTodo, toggleTodoStatus } from "../store/slices/todosSlice";

const TodosPage = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.todos.value);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  // Handle add new todo
  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      toast.error("Todo text cannot be empty.");
      return;
    };
    try {
      const newTodoItem = { id: crypto.randomUUID(), text: newTodo, createdAt: new Date().toISOString(), isDone: false };
      dispatch(addNewTodo(newTodoItem));
      localStorage.setItem("todos", JSON.stringify([...value, newTodoItem]));
      setNewTodo("");
      toast.success("Todo added successfully!");
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("Failed to add todo.");
    };
  };
  // Handle delete todo
  const handleDeleteTodo = (id: string) => {
    try {
      dispatch(deleteTodo(id));
      localStorage.setItem("todos", JSON.stringify(value.filter(todo => todo.id !== id)));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast.error("Failed to delete todo.");
    };
  };
  // Handle mark todo as done
  const handleMarkAsDone = (id: string) => {
    try {
      dispatch(toggleTodoStatus(id));
      localStorage.setItem("todos", JSON.stringify(
        value.map(todo => 
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      ));
      toast.success("Todo status updated successfully!");
    } catch (error) {
      console.error("Failed to mark todo as done:", error);
      toast.error("Failed to update todo status.");
    };
  };
  useEffect(() => {
    // Fetch todos from local storage and store it in redux store
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch(allTodos(JSON.parse(storedTodos)));
    };
  }, [dispatch]);
  const filteredTodos = value.filter((todo) => {
    if (filter === "done") return todo.isDone;
    if (filter === "notDone") return !todo.isDone;
    return true;
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
      <div className="flex flex-col gap-2 w-lg">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Todos
        </h1>
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Write your todo here..."
            className="px-3 py-2 bg-gray-900 w-full rounded-md outline-0 border border-white"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5 cursor-pointer"
            onClick={handleSubmitTask}
          >
            Submit
          </button>
        </form>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 text-xs rounded-full ${filter === "all" ? "bg-foreground text-background" : "bg-background border border-white text-white"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-xs rounded-full ${filter === "done" ? "bg-foreground text-background" : "bg-background border border-white text-white"}`}
            onClick={() => setFilter("done")}
          >
            Done
          </button>
          <button
            className={`px-4 py-2 text-xs rounded-full ${filter === "notDone" ? "bg-foreground text-background" : "bg-background border border-white text-white"}`}
            onClick={() => setFilter("notDone")}
          >
            Not Done
          </button>
        </div>
        <ul className="flex flex-col gap-2 w-full h-96 overflow-y-auto">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <li key={todo.id} className="w-full bg-gray-950 rounded-xl flex justify-between">
                <div className={`py-2 border-l-5 ${todo.isDone ? "border-green-500" : "border-gray-500"} pl-3 rounded-md`}>
                  <p className={`text-xl mb-1 ${todo.isDone ? "line-through" : ""}`}>{todo.text}</p>
                  <span className="text-xs text-zinc-400">Created On</span>{" "}
                <span className={`text-xs ${todo.isDone ? "text-green-500" : "text-gray-500"} font-bold`}>{new Date(todo.createdAt).toLocaleDateString("en-US", { weekday: 'long' })}</span> {" "}
                <span className={`text-xs ${todo.isDone ? "text-green-500" : "text-gray-500"}`}>{new Date(todo.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })} - {new Date(todo.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className="flex items-center gap-3 pr-3">
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="text-gray-500 cursor-pointer text-lg"
                  onClick={() => handleMarkAsDone(todo.id)}
                >
                  {!todo.isDone ? <FaRegCircle /> : <FaCheckCircle />}
                </button>
              </div>
              </li>
            ))
          ) : (
            filteredTodos.length === 0 && filter === "done" ? (
              <p className="text-gray-500">No completed todos.</p>
            ) : filteredTodos.length === 0 && filter === "notDone" ? (
              <p className="text-gray-500">No pending todos.</p>
            ) : (
              <p className="text-gray-500">No todos available. Add a new todo!</p>
            )
          )}
        </ul>
      </div>
    </div>
  )
};

export default TodosPage;