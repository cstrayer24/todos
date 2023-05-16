import React, { useState } from "react";

import { type } from "os";

function Todo({
  name,
  end,
  startDate,
}: {
  name: string;
  end: string;
  startDate?: string;
}): JSX.Element {
  const date = new Date();
  const start = date.toLocaleDateString();

  let current = `${date.getMonth()}/${date.getDate()}`;
  let [there, remove] = useState(true);
  async function rm() {
    remove(false);
    const req = await fetch(`/api/delete-todo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ start, name, end }),
    });
  }
  return (
    <>
      {there && (
        <div className=" grid grid-cols-4 outline   grid-flow-col-dense">
          <span>
            start: {startDate ? startDate : date.toLocaleDateString()}
          </span>
          <span className=" text-center ml-2 block">{name}</span>
          <span>target: {end}</span>
          <button onClick={rm}>done</button>
        </div>
      )}
    </>
  );
}

export default Todo;
