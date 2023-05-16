import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";
import { Session, Todo, User } from "@prisma/client";

async function makeTodo(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    return res.status(403).json({ err: "not logged in" });
  }
  if (req.method != "POST") {
    return res.status(400).json({ err: "bad request" });
  }
  const { starts, todoName, expires } = req.body;
  console.log(starts);
  console.log(todoName);
  console.log(expires);
  console.log(req.body);
  const sessionOfUser: Session | null = await prisma.session.findFirst({
    where: { id: sessionId },
  });

  const user: User | null = await prisma.user.findFirst({
    where: { id: sessionOfUser?.userId },
  });
  try {
    const todo: Todo | null = await prisma.todo.create({
      data: {
        start: starts,
        name: todoName,
        expires: expires,
        userId: user?.id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ stat: "success" });
}
export default makeTodo;
