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

interface UserContactNotificationProps {
  firstName: string
}

export default function UserContactNotification({ firstName }: UserContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Lymphatic Specialists of Madison, {firstName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Lymphatic Specialists of Madison</Heading>

          <Hr style={hr} />

          <Section style={container}>
            <Text style={paragraph}>Hi {firstName},</Text>

            <Text style={paragraph}>
              Thank you for reaching out to Lymphatic Specialists of Madison! We've received your
              message and will get back to you as soon as possible.
            </Text>

            <Text style={paragraph}>
              In the meantime, feel free to{' '}
              <Link href={`${SITE_URL}`} style={link}>
                explore our website
              </Link>{' '}
              to learn more about our services and how Manual Lymphatic Drainage Massage therapy can
              benefit you.
            </Text>

            <Text style={paragraph}>
              If you have any urgent questions or concerns, please don't hesitate to{' '}
              <Link href={`${SITE_URL}/contact`} style={link}>
                contact us directly.
              </Link>
            </Text>

            <Text style={paragraph}>We look forward to connecting with you soon!</Text>

            <Text style={paragraph}>
              Warm regards,
              <br />
              The Lymphatic Specialists of Madison Team
            </Text>

            <Section>
              <Button style={button} href={`${SITE_URL}`} target="_blank">
                Visit Our Website
              </Button>
            </Section>
          </Section>

          <Hr style={hr} />

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
