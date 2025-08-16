import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { SITE_URL } from '../../consts'

interface WelcomeProps {
  email: string
  isSubscribed?: boolean
}

export default function Welcome({ email, isSubscribed = true }: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {isSubscribed
          ? `Welcome to Lymphatic Specialists of Madison, ${email}`
          : `Thank you for contacting Lymphatic Specialists of Madison, ${email}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${SITE_URL}/logo.svg`}
            width="320"
            height="auto"
            alt="Lymphatic Specialists of Madison Logo"
            style={logo}
          />

          <Hr style={hr} />

          <Section style={container}>
            <Text style={paragraph}>Hi {email || 'there'},</Text>

            <Text style={paragraph}>
              {isSubscribed
                ? 'Thank you for subscribing to Lymphatic Specialists of Madison'
                : 'Thank you for contacting Lymphatic Specialists of Madison'}
            </Text>

            <Text style={paragraph}>
              {isSubscribed
                ? "We've received your information and will get back to you shortly. You've also been added to our mailing list. We limit our emails to only a few a year, and we never sell your information to others. If you ever find that these emails no longer fit your fancy, you can unsubscribe anytime."
                : "We've received your information and will get back to you shortly."}
            </Text>

            <Text style={paragraph}>
              Sincerely,
              <br />
              The Lymphatic Specialists of Madison Team
            </Text>

            <Section>
              <Button style={button} href={`${SITE_URL}`} target="_blank">
                Learn More
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          {isSubscribed && (
            <Link style={link} href={`${SITE_URL}/api/forms/unsubscribe/${email}`} target="_blank">
              unsubscribe
            </Link>
          )}

          <Text style={footer}>Lymphatic Specialists of Madison</Text>
          <Text style={footer}>Madison, WI</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#2b86a5',
  borderRadius: '25px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px',
}

const link = {
  color: '#2b86a5',
  textDecoration: 'none',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
