import { env } from "@/config/env";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  link: string;
}

export const ResetPasswordEmailTemplate = ({ link }: Props) => (
  <Html>
    <Head />
    <Preview>Your password reset link</Preview>
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
          Your password reset link
        </Heading>
        <Section className="py-6">
          <Button
            className="bg-primary-foreground rounded text-white text-15 font-semibold no-underline text-center block py-3 px-6"
            href={link}
          >
            Reset your password
          </Button>
        </Section>
        <Text className="mb-4 text-15 leading-relaxed text-gray-900">
          This link and token will only be valid for the next 1 hour.
        </Text>
        <Hr className="border-gray-300 my-10" />
        <Link href={env.NEXT_PUBLIC_APP_URL} className="text-14 text-gray-500">
          OX
        </Link>
      </Container>
    </Body>
  </Html>
);
