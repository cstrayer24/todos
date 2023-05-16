import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
async function makeSession(req: NextApiRequest, res: NextApiResponse) {
  const { user, expires } = req.body;

  if (req.method != "POST") {
    return res.status(404).json({ eror: "bad request" });
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: expires,
    },
  });

  return res.status(200).json({ session });
}
export default makeSession;
