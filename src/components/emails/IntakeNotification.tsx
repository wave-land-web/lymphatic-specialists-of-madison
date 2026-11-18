import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { SITE_URL } from '../../consts'

// Deliberately carries no patient details: names, contact info and health answers
// stay in Sanity, behind the Studio login.
export default function IntakeNotification() {
  return (
    <Html>
      <Head />
      <Preview>New intake form submission</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Intake Form Submission</Heading>

          <Text style={paragraph}>
            Someone just submitted an intake form on your website. Log in to see their details.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={`${SITE_URL}/admin`} target="_blank">
              Log in to view
            </Button>
          </Section>

          <Text style={footer}>
            This notification was sent from your Lymphatic Specialists website intake form.
          </Text>
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
  maxWidth: '600px',
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
  color: '#1a1a1a',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
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

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '30px',
}
