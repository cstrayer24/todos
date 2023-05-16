import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import * as argon2 from "argon2";
import { use } from "react";
async function signin(req: NextApiRequest, res: NextApiResponse) {
  const { email, pass } = req.body;
  if (req.method != "POST") {
    return res.status(400).json({ stat: "err" });
  }
  console.log(req.body);
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(400).json({ err: "no user" });
  }
  const isValidPassword = await argon2.verify(user.password, pass);

  if (!isValidPassword) {
    return res.status(400).json({ error: "wrong password" });
  }

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

  return res.status(200).json({ user });
}

export default signin;
