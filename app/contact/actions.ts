"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: FormData) {
  const email = formData.get("email");
  const message = formData.get("message");

  const { data, error } = await resend.emails.send({
    from: "Manuality <manuality@kevinang.com>",
    to: ["ka@kevinang.com"],
    subject: "Contact Form Submission",
    html: `<br>Email: ${email}<br>Message: ${message}`,
  });

  return { data, error };
}
