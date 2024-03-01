import { config } from "@/lib/config";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface Props {
  token: string;
}

export const TwoFactorEmailTemplate = ({ token }: Props) => (
  <Html>
    <Head />
    <Preview>Your 2FA code is {token}</Preview>
    <Body className="bg-white font-sans">
      <Container className="mx-auto py-5 px-0 w-560">
        {/* <Img
          src={`${baseUrl}/static/linear-logo.png`}
          width="42"
          height="42"
          alt="Linear"
          className="rounded-full w-42 h-42"
        /> */}
        <Heading className="text-24 leading-snug font-normal text-gray-800 py-4">
          Your 2FA code is <br />
          <code className="font-mono font-bold bg-gray-300 px-2 py-1 rounded-md text-gray-900">
            {token}
          </code>
        </Heading>
        <Text className="mb-4 text-15 leading-relaxed text-gray-900">
          This token will only be valid for the next 15 minutes.
        </Text>
        <Hr className="border-gray-300 my-10" />
        <Link
          href={config.domain.NEXT_PUBLIC_APP_URL}
          className="text-14 text-gray-500"
        >
          OX
        </Link>
      </Container>
    </Body>
  </Html>
);
