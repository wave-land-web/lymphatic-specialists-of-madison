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

interface UserIntakeNotificationProps {
  firstName: string
}

export default function UserIntakeNotification({ firstName }: UserIntakeNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for completing your intake form, {firstName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Lymphatic Specialists of Madison</Heading>

          <Hr style={hr} />

          <Section style={container}>
            <Text style={paragraph}>Hi {firstName},</Text>

            <Text style={paragraph}>
              Thank you for completing your intake form for Lymphatic Specialists of Madison! We've
              received all your information and our team is reviewing it.
            </Text>

            <Text style={paragraph}>
              In the meantime, please feel free to review our FAQ page if you have any questions
              about what to expect during your visit.
            </Text>

            <Text style={paragraph}>
              If you need to make any changes to your submission or have additional questions,
              please don't hesitate to{' '}
              <Link href={`${SITE_URL}/contact`} style={link}>
                contact us directly.
              </Link>
            </Text>

            <Text style={paragraph}>We're excited to work with you on your wellness journey!</Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              The Lymphatic Specialists of Madison Team
            </Text>

            <Section>
              <Button style={button} href={`${SITE_URL}/faq`} target="_blank">
                Read Our FAQ
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
