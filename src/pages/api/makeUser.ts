import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as argon2 from "argon2";
import exp from "constants";

async function makeUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, pass } = req.body;

  if (req.method !== "POST") {
    return res.status(404).json({ error: "badrequest" });
  }
  console.log(pass);

  const password = await argon2.hash(pass);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  const expiresAt = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: expiresAt,
    },
  });
  res.setHeader("Set-cookie", [
    `sessionId=${
      session.id
    }; Path=/; HttpOnly; Expires=${expiresAt.toUTCString()};`,
    `isLoggedIn=${1}; tOrf=1; Path=/; Expires=${expiresAt.toUTCString()};`,
  ]);
  return res.status(200).json({ user, session });
}

export default makeUser;
