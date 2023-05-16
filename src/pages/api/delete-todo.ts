import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
  const { start, name, end } = req.body;
  const { sessionId } = req.cookies;
  console.log(start);
  console.log(name);
  console.log(end);
  if (req.method != "POST") {
    return res.status(400).json({ err: "bad request" });
  }

  if (!sessionId) {
    return res.status(403).json({ err: "not logged in" });
  }
  const sessionOfUser = await prisma.session.findFirst({
    where: {
      id: sessionId,
    },
  });
  const toBeDeleted = await prisma.todo.findFirst({
    where: {
      name: name,
    },
  });

  console.log(toBeDeleted);
  await prisma.todo.delete({ where: { id: toBeDeleted?.id } });
  return res.status(200);
}
export default deleteTodo;
