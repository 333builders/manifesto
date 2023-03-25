import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { recoverAddress, hashMessage } from "ethers/lib/utils.js";

const message = "gm wagmi frens";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    return
  }
  const client = await clientPromise;
  const db = client.db("manifesto");
  const address = req.body.address;
  const signature = req.body.signature;
  const verifySigner = recoverAddress(hashMessage(message), signature);
  if (verifySigner !== address) {
    res.status(403).end("Sign Message Failed")
    return
  }
  const currentSignature = await db.collection("signature").findOne({ address: address })
  if(currentSignature) {
    res.status(403).end("Signature already exist")
    return
  }
  await db.collection("signature").insertOne({ address, signature });
  res.json({ address, signature, message });
}
