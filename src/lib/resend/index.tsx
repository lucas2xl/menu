import { config } from "@/lib/config";
import { Resend } from "resend";
import { TwoFactorEmail } from "../email-template/two-factor-email";

const resend = new Resend(config.resend.RESEND_API_KEY);

function makeLink(path: string, token: string) {
  return `${config.domain.NEXT_PUBLIC_APP_URL}${path}?token=${token}`;
}

export async function sendTwoFactorEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  await resend.emails.send({
    from: "Menu <team@2x-l.com>",
    to: [email],
    subject: "2FA Code",
    react: <TwoFactorEmail code={token} />,
  });
}
