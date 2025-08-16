import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { SITE_URL } from '../../consts'

interface UnsubscribeProps {
  email: string
}

export default function Unsubscribe({ email }: UnsubscribeProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {email || 'You'} have been unsubscribed from Lymphatic Specialists of Madison. You will no
        longer receive any emails from us.
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
            <Text style={paragraph}>
              Hi {email || 'there'}, you have been unsubscribed from Lymphatic Specialists of
              Madison. You will no longer receive any emails from us.
            </Text>
            <Text style={paragraph}>Come back anytime!</Text>

            <Section>
              <Button style={button} href={`${SITE_URL}`} target="_blank">
                Back to Lymphatic Specialists of Madison
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

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
