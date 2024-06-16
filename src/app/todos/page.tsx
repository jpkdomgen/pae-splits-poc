"use client";
import Link from "next/link";
import { getTodos } from "../../../lib/todsservice";
import { handleSaveTodoForm } from "../../../lib/actions";
import { useEffect, useState } from "react";
import { todo } from "node:test";

export default function ToDoPage() {
  const [todos, setTodos] = useState([]);

  useEffect(function () {
    console.log("Use effect");
    (async () => {
      const todosFromServer: any = await getTodos();
      setTodos(todosFromServer);
    })();
  }, []);

  function handleSubmit(event) {
    console.log(event.get("title"));
    (async () => {
      const todosFromServer: any = await handleSaveTodoForm(event);
      setTodos([...todos, todosFromServer]);
    })();
  }

  return (
    <main>
      <h1> All Todos</h1>

      <form
        className="bg-white shadow-md rounder px-8 pt-6 pb-8 mb-4"
        action={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            placeholder="Todo Title"
          ></input>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <h1>List of Todos</h1>
      <ul>
      {todos.map((todo, index) => {
        return (
          <>
            <li key={index}>
              {todo.title}: {todo.description}
            </li>
          </>
        );
      })}
      </ul>
      <Link href="/">Back to Home</Link>
    </main>
  );
}
