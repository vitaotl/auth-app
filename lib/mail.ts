import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const localUrl = process.env.LOCAL_URL

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${localUrl}/auth/new-verification?token=${token}`

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
