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
} from '@react-email/components'
import { SITE_URL } from '../../consts'

interface WelcomeProps {
  email: string
}

export default function Welcome({ email }: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to our newsletter, ${email}! Get ready for expert lymphatic health tips.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Lymphatic Specialists of Madison</Heading>

          <Hr style={hr} />

          <Section style={container}>
            <Text style={paragraph}>Hi {email},</Text>

            <Text style={paragraph}>Welcome to the Lymphatic Specialists of Madison!</Text>

            <Text style={paragraph}>
              We only send a few emails per year, and we'll never share your information with anyone
              else.
            </Text>

            <Text style={paragraph}>
              Thanks for joining our community,
              <br />
              The Lymphatic Specialists of Madison Team
            </Text>

            <Section>
              <Button style={button} href={`${SITE_URL}`} target="_blank">
                Explore Our Website
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

          <Link style={link} href={`${SITE_URL}/api/forms/unsubscribe/${email}`} target="_blank">
            unsubscribe
          </Link>

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
const heading = {
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: 'bold',
  color: '#1a1a1a',
  marginBottom: '20px',
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
