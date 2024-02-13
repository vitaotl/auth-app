"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/data/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { log } from "console"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: "Email already in use!" }
  }

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const verificationToken = await generateVerificationToken(email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Confirmation email sent!" }
  } catch (error) {
    return { error: "Database connection error. Please try again later!" }
  }
}
