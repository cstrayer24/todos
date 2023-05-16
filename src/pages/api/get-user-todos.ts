import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";
async function getTodos(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    return res.status(403).json({ err: "not logged in" });
  }

  if (req.method !== "GET") {
    return res.status(400).json({ err: "bad request" });
  }
  const userSession = await prisma.session.findFirst({
    where: {
      id: sessionId,
    },
  });

  const userTodos = await prisma.todo.findMany({
    where: {
      userId: userSession?.userId,
    },
  });
  res.setHeader("content-type", "application/json");
  return res.status(200).json(userTodos);
}
export default getTodos;
