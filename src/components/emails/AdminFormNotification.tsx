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

interface AdminFormNotificationProps {
  title: string
  message: string
  formName: string
  submittedAt: string
  studioUrl: string
}

// Deliberately carries no personal details: names, contact info, messages and health
// answers stay in Sanity, behind the Studio login.
export default function AdminFormNotification({
  title,
  message,
  formName,
  submittedAt,
  studioUrl,
}: AdminFormNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {title} · {submittedAt}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{title}</Heading>

          <Text style={paragraph}>{message}</Text>
          <Text style={meta}>Submitted {submittedAt}</Text>

          <Section style={buttonContainer}>
            <Button style={button} href={studioUrl} target="_blank">
              Log in to view
            </Button>
          </Section>

          <Text style={footer}>
            This notification was sent from your Lymphatic Specialists website {formName} form.
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

const meta = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#525f7f',
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
