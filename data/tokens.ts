import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "./verificationToken"
import { db } from "@/lib/db"

const SECONDS_IN_HOUR = 60 * 60
const MILISECONDS_IN_HOUR = SECONDS_IN_HOUR * 1000

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + MILISECONDS_IN_HOUR)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}
