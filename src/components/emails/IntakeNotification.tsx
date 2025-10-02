import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { SITE_URL } from '../../consts'
import { capitalize, formatDate } from '../../lib/text'

interface IntakeNotificationProps {
  firstName: string
  lastName: string
  email: string
  phoneDaytime?: string
  phoneEvening?: string
  dateOfBirth?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  reasonForSeeking?: {
    purpose?: 'medical' | 'relaxation' | 'other'
    problemDescription?: string
  }
  additionalInformation?: string
}

export default function IntakeNotification({
  firstName,
  lastName,
  email,
  phoneDaytime,
  phoneEvening,
  dateOfBirth,
  emergencyContactName,
  emergencyContactPhone,
  reasonForSeeking,
  additionalInformation,
}: IntakeNotificationProps) {
  const fullName = `${capitalize(firstName)} ${capitalize(lastName)}`
  const purposeText =
    reasonForSeeking?.purpose === 'medical'
      ? 'Medical'
      : reasonForSeeking?.purpose === 'relaxation'
        ? 'Relaxation'
        : reasonForSeeking?.purpose === 'other'
          ? 'Other'
          : 'Not specified'

  return (
    <Html>
      <Head />
      <Preview>New intake form submission from {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={container}>
            <Heading style={heading}>New Intake Form Submission</Heading>

            <Text style={paragraph}>
              Someone has submitted an intake form for Manual Lymphatic Drainage Massage treatment!
            </Text>

            <Hr style={hr} />

            <Text style={subheading}>Personal Information:</Text>
            <Text style={paragraph}>
              <strong>Name:</strong> {fullName}
              <br />
              <strong>Email:</strong> {email}
              <br />
              {phoneDaytime && (
                <>
                  <strong>Daytime Phone:</strong> {phoneDaytime}
                  <br />
                </>
              )}
              {phoneEvening && (
                <>
                  <strong>Evening Phone:</strong> {phoneEvening}
                  <br />
                </>
              )}
              {dateOfBirth && (
                <>
                  <strong>Date of Birth:</strong> {formatDate(dateOfBirth)}
                  <br />
                </>
              )}
            </Text>

            {emergencyContactName && emergencyContactPhone && (
              <>
                <Text style={subheading}>Emergency Contact:</Text>
                <Text style={paragraph}>
                  <strong>Name:</strong> {emergencyContactName}
                  <br />
                  <strong>Phone:</strong> {emergencyContactPhone}
                </Text>
              </>
            )}

            <Text style={subheading}>Treatment Inquiry:</Text>
            <Text style={paragraph}>
              <strong>Purpose:</strong> {purposeText}
            </Text>

            {reasonForSeeking?.problemDescription && (
              <>
                <Text style={subheading}>Problem Description:</Text>
                <Text style={messageBox}>{reasonForSeeking.problemDescription}</Text>
              </>
            )}

            {additionalInformation && (
              <>
                <Text style={subheading}>Additional Information:</Text>
                <Text style={messageBox}>{additionalInformation}</Text>
              </>
            )}

            <Hr style={hr} />

            <Section style={buttonContainer}>
              <Button style={button} href={`${SITE_URL}/admin`} target="_blank">
                View Full Intake Form in CMS
              </Button>
            </Section>

            <Text style={footer}>
              This notification was sent from your Lymphatic Specialists website intake form.
            </Text>
          </Section>
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

const subheading = {
  fontSize: '18px',
  lineHeight: '22px',
  fontWeight: 'bold',
  color: '#1a1a1a',
  marginTop: '20px',
  marginBottom: '10px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#1a1a1a',
}

const messageBox = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#1a1a1a',
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid #e9ecef',
  marginTop: '10px',
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

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '30px',
}
