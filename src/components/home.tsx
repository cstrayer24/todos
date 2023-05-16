import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Todo from "./todo";

function Home() {
  const [el, newEl] = useState([]);
  const [expires, setExpries] = useState("");
  const [todoName, setTodoName] = useState("");
  const starts = new Date().toLocaleDateString();
  async function getAllTodos() {
    const req = await fetch("/api/get-user-todos");

    const res = await req.json();
    const todoArr = [];

    for (let i: number = 0; i < res.length; i++) {
      todoArr.push(
        <Todo
          name={res[i].name}
          end={res[i].expires}
          startDate={res[i].start}
        />
      );
    }

    newEl(el.concat(todoArr));
  }

  useEffect(() => {
    getAllTodos();
  }, []);
  const addTodo = async () => {
    setExpries(new Date(expires).toLocaleDateString());
    newEl(
      el.concat(
        <Todo name={todoName} end={new Date(expires).toLocaleDateString()} />
      )
    );
    const req = await fetch("/api/makeTodo", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ starts, todoName, expires }),
    });
    const res = await req.json();
  };
  return (
    <div className="w-screen h-screen grid place-items-center overflow-y-scroll">
      <div className="">
        <input
          type="text"
          id="input"
          className=" text-green-500 mr-8 border-solid border-white border-4 bg-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTodoName(e.target.value);
            console.log(todoName);
          }}
        />
        <input
          type="date"
          name=""
          id="end"
          className=" text-green-500 mr-8 border-solid border-white border-4 bg-black"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setExpries(e.target.value);
            console.log(expires);
          }}
        />
        <button
          className="border-solid border-white border-4"
          onClick={addTodo}
        >
          add todo
        </button>
        {el}
      </div>
    </div>
  );
}
export default Home;
