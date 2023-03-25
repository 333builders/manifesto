import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const client = await clientPromise;
  const db = client.db("manifesto");
  const signatures = await db.collection("signature").find({}).toArray();
  res.json(signatures);
}
