import { ResetPasswordEmailTemplate } from "@/components/email-template/reset-password";
import { TwoFactorEmailTemplate } from "@/components/email-template/two-factor";
import { env } from "@/config/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

function makeLink(path: string, token: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}?token=${token}`;
}

export async function sendPasswordResetEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const resetLink = makeLink("/new-password", token);

  await resend.emails.send({
    from: "OX <onboarding@resend.dev>",
    to: [email],
    subject: "Confirm your email address",
    react: <ResetPasswordEmailTemplate link={resetLink} />,
  });
}

export async function sendTwoFactorEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  await resend.emails.send({
    from: "OX <onboarding@resend.dev>",
    to: [email],
    subject: "2FA Code",
    react: <TwoFactorEmailTemplate token={token} />,
  });
}
