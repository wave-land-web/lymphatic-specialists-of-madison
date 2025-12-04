export const prerender = false // Enable server-side rendering for form handling

import { render } from '@react-email/render'
import type { APIRoute } from 'astro'
import IntakeNotification from '../../../components/emails/IntakeNotification'
import UserIntakeNotification from '../../../components/emails/UserIntakeNotification'
import { resend } from '../../../lib/resend'
import { checkSpamProtectionWithAltcha } from '../../../lib/altcha'
import { sanityClient } from '../../../sanity/lib/client'
import {
  createIntakeFormSubmission,
  type IntakeFormData,
  type MedicalConditions,
} from '../../../sanity/lib/formSubmissions'

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse form data from the request
    const formData = await request.formData()

    // Check honeypot field (spam protection)
    const botField = formData.get('bot-field') as string
    if (botField) {
      console.log('Spam submission detected via honeypot field')
      return new Response(
        JSON.stringify({
          success: false,
          error: 'An error occurred while processing your request.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Altcha spam protection
    const spamCheck = await checkSpamProtectionWithAltcha(formData)
    if (spamCheck.isSpam) {
      console.log('Altcha spam protection triggered:', spamCheck.reason)
      return new Response(
        JSON.stringify({
          success: false,
          error: spamCheck.reason || 'Please complete the security challenge.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Extract required personal information fields
    const firstName = formData.get('first-name') as string
    const lastName = formData.get('last-name') as string
    const email = formData.get('email') as string

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: firstName, lastName, and email are required.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // Extract personal information
    const personalInfo = {
      firstName: firstName,
      lastName: lastName,
      phoneDaytime: formData.get('phone-day') as string,
      phoneEvening: (formData.get('phone-evening') as string) || undefined,
      email: email,
      dateOfBirth: (formData.get('date-of-birth') as string) || undefined,
      pronouns: (formData.get('pronouns') as string) || undefined,
      address: {
        streetAddress: (formData.get('street-address') as string) || undefined,
        addressLine2: (formData.get('address-line-2') as string) || undefined,
        city: (formData.get('city') as string) || undefined,
        state: (formData.get('state') as string) || undefined,
        zipCode: (formData.get('zip-code') as string) || undefined,
        country: (formData.get('country') as string) || undefined,
      },
    }

    // Extract emergency contact
    const emergencyContact = {
      name: (formData.get('emergency-contact-name') as string) || undefined,
      phone: (formData.get('emergency-contact-phone') as string) || undefined,
      physician: (formData.get('emergency-contact-physician') as string) || undefined,
    }

    // Extract how they heard about us
    const howDidYouHear = {
      source:
        (formData.get('hear-about') as
          | 'search'
          | 'doctor'
          | 'local'
          | 'friend'
          | 'social'
          | 'blog'
          | 'booksy'
          | 'other') || undefined,
      otherSpecify: (formData.get('hear-about-other-specify') as string) || undefined,
    }

    // Extract reason for seeking MLD
    const reasonForSeeking = {
      purpose: (formData.get('reason') as 'medical' | 'relaxation' | 'other') || undefined,
      medicalStartDate:
        (formData.get('reason-for-seeking-mld-medical-start') as string) || undefined,
      problemDescription:
        (formData.get('reason-for-seeking-mld-medical-description') as string) || undefined,
    }

    // Extract medical conditions - this is complex due to nested structure
    const medicalConditions: MedicalConditions = {
      general: {
        fever: formData.get('medical-conditions-general-fever') === 'on',
        cancerTreatment: formData.get('medical-conditions-general-cancer-treatment') === 'on',
        lastChemotherapy:
          formData.get('medical-conditions-general-last-chemotherapy-session') === 'on',
        arteriosclerosis: formData.get('medical-conditions-general-arteriosclerosis') === 'on',
        carotidSinusIssues:
          formData.get('medical-conditions-general-carotid-sinus-issues') === 'on',
        hyperthyroidism: formData.get('medical-conditions-general-hyperthyroidism') === 'on',
        liverCirrhosis: formData.get('medical-conditions-general-liver-cirrhosis') === 'on',
        other: formData.get('medical-conditions-general-other') === 'on',
        na: formData.get('medical-conditions-general-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-general-other-specify') as string) || undefined,
      },
      earsNoseThroat: {
        ringingInEars: formData.get('medical-conditions-ears-nose-throat-ringing-in-ears') === 'on',
        sinusProblems: formData.get('medical-conditions-ears-nose-throat-sinus-problems') === 'on',
        earaches: formData.get('medical-conditions-ears-nose-throat-earaches') === 'on',
        other: formData.get('medical-conditions-ears-nose-throat-other') === 'on',
        na: formData.get('medical-conditions-ears-nose-throat-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-ears-nose-throat-other-specify') as string) ||
          undefined,
      },
      cardiovascular: {
        chestPainOrPressure:
          formData.get('medical-conditions-cardiovascular-chest-pain-or-pressure') === 'on',
        swellingOfLegs: formData.get('medical-conditions-cardiovascular-swelling-of-legs') === 'on',
        palpitations: formData.get('medical-conditions-cardiovascular-palpitations') === 'on',
        varicoseVeins: formData.get('medical-conditions-cardiovascular-varicose-veins') === 'on',
        dizziness: formData.get('medical-conditions-cardiovascular-dizziness') === 'on',
        acuteDeepVeinThrombosis:
          formData.get('medical-conditions-cardiovascular-acute-deep-vein-thrombosis') === 'on',
        congestiveHeartFailure:
          formData.get('medical-conditions-cardiovascular-congestive-heart-failure') === 'on',
        heartAttack: formData.get('medical-conditions-cardiovascular-heart-attack') === 'on',
        highLowBloodPressure:
          formData.get('medical-conditions-cardiovascular-high-low-blood-pressure') === 'on',
        aneurysm: formData.get('medical-conditions-cardiovascular-aneurysm') === 'on',
        cardiacArrhythmia:
          formData.get('medical-conditions-cardiovascular-cardiac-arrhythmia') === 'on',
        other: formData.get('medical-conditions-cardiovascular-other') === 'on',
        na: formData.get('medical-conditions-cardiovascular-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-cardiovascular-other-specify') as string) || undefined,
      },
      gastroIntestinal: {
        crohnsDisease: formData.get('medical-conditions-gastro-intestinal-crohns-disease') === 'on',
        abdominalPain: formData.get('medical-conditions-gastro-intestinal-abdominal-pain') === 'on',
        surgicalImplant:
          formData.get('medical-conditions-gastro-intestinal-surgical-implant') === 'on',
        giInflammation:
          formData.get('medical-conditions-gastro-intestinal-gi-inflammation') === 'on',
        diverticulitisOrDiverticulosis:
          formData.get('medical-conditions-gastro-intestinal-diverticulitis-or-diverticulosis') ===
          'on',
        other: formData.get('medical-conditions-gastro-intestinal-other') === 'on',
        na: formData.get('medical-conditions-gastro-intestinal-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-gastro-intestinal-other-specify') as string) ||
          undefined,
      },
      urinary: {
        kidneyFailure: formData.get('medical-conditions-urinary-kidney-failure') === 'on',
        kidneyStones: formData.get('medical-conditions-urinary-kidney-stones') === 'on',
        urinaryTractInfection:
          formData.get('medical-conditions-urinary-urinary-tract-infection') === 'on',
        dialysis: formData.get('medical-conditions-urinary-dialysis') === 'on',
        other: formData.get('medical-conditions-urinary-other') === 'on',
        na: formData.get('medical-conditions-urinary-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-urinary-other-specify') as string) || undefined,
      },
      femaleReproductive: {
        currentlyPregnant:
          formData.get('medical-conditions-female-reproductive-currently-pregnant') === 'on',
        currentlyMenstruating:
          formData.get('medical-conditions-female-reproductive-currently-menstruating') === 'on',
        fibrocysticBreastDisease:
          formData.get('medical-conditions-female-reproductive-fibrocystic-breast-disease') ===
          'on',
        iud: formData.get('medical-conditions-female-reproductive-iud') === 'on',
        other: formData.get('medical-conditions-female-reproductive-other') === 'on',
        na: formData.get('medical-conditions-female-reproductive-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-female-reproductive-other-specify') as string) ||
          undefined,
      },
      musculoskeletal: {
        osteoporosis: formData.get('medical-conditions-musculoskeletal-osteoporosis') === 'on',
        osteoarthritis: formData.get('medical-conditions-musculoskeletal-osteoarthritis') === 'on',
        hernia: formData.get('medical-conditions-musculoskeletal-hernia') === 'on',
        rheumatoidArthritis:
          formData.get('medical-conditions-musculoskeletal-rheumatoid-arthritis') === 'on',
        other: formData.get('medical-conditions-musculoskeletal-other') === 'on',
        na: formData.get('medical-conditions-musculoskeletal-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-musculoskeletal-other-specify') as string) || undefined,
      },
      skin: {
        cellulitisBacterialSkinInfection:
          formData.get('medical-conditions-skin-cellulitis-bacterial-skin-infection') === 'on',
        rash: formData.get('medical-conditions-skin-rash') === 'on',
        majorScars: formData.get('medical-conditions-skin-major-scars') === 'on',
        lumps: formData.get('medical-conditions-skin-lumps') === 'on',
        other: formData.get('medical-conditions-skin-other') === 'on',
        na: formData.get('medical-conditions-skin-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-skin-other-specify') as string) || undefined,
      },
      hematologicLymphatic: {
        cutsThatDoNotStopBleeding:
          formData.get(
            'medical-conditions-hematologic-lymphatic-cuts-that-do-not-stop-bleeding'
          ) === 'on',
        enlargedLymphNodes:
          formData.get('medical-conditions-hematologic-lymphatic-enlarged-lymph-nodes') === 'on',
        lymphNodesRemoved:
          formData.get('medical-conditions-hematologic-lymphatic-lymph-nodes-removed') === 'on',
        frequentBruising:
          formData.get('medical-conditions-hematologic-lymphatic-frequent-bruising') === 'on',
        hivAids: formData.get('medical-conditions-hematologic-lymphatic-hiv-aids') === 'on',
        factorVLeiden:
          formData.get('medical-conditions-hematologic-lymphatic-factor-v-leiden') === 'on',
        clottingIssues:
          formData.get('medical-conditions-hematologic-lymphatic-clotting-issues') === 'on',
        na: formData.get('medical-conditions-hematologic-lymphatic-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-hematologic-lymphatic-other-specify') as string) ||
          undefined,
      },
      neurological: {
        strokes: formData.get('medical-conditions-neurological-strokes') === 'on',
        seizures: formData.get('medical-conditions-neurological-seizures') === 'on',
        other: formData.get('medical-conditions-neurological-other') === 'on',
        na: formData.get('medical-conditions-neurological-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-neurological-other-specify') as string) || undefined,
      },
      allergies: {
        earFullness: formData.get('medical-conditions-allergies-ear-fullness') === 'on',
        sinusCongestion: formData.get('medical-conditions-allergies-sinus-congestion') === 'on',
        recentSinusInjury:
          formData.get('medical-conditions-allergies-recent-sinus-injury') === 'on',
        other: formData.get('medical-conditions-allergies-other') === 'on',
        na: formData.get('medical-conditions-allergies-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-allergies-other-specify') as string) || undefined,
      },
      emotional: {
        stress: formData.get('medical-conditions-emotional-stress') === 'on',
        anxiety: formData.get('medical-conditions-emotional-anxiety') === 'on',
        difficultySleeping:
          formData.get('medical-conditions-emotional-difficulty-sleeping') === 'on',
        depression: formData.get('medical-conditions-emotional-depression') === 'on',
        other: formData.get('medical-conditions-emotional-other') === 'on',
        na: formData.get('medical-conditions-emotional-na') === 'on',
        otherSpecify:
          (formData.get('medical-conditions-emotional-other-specify') as string) || undefined,
      },
    }

    // Extract surgeries - handling multiple dynamic entries
    const surgeries: Array<{ name?: string; date?: string; hospitalAndSurgeon?: string }> = []
    let surgeryIndex = 0
    while (formData.get(`surgery-${surgeryIndex}-name`)) {
      surgeries.push({
        name: (formData.get(`surgery-${surgeryIndex}-name`) as string) || undefined,
        date: (formData.get(`surgery-${surgeryIndex}-date`) as string) || undefined,
        hospitalAndSurgeon:
          (formData.get(`surgery-${surgeryIndex}-hospital`) as string) || undefined,
      })
      surgeryIndex++
    }

    // Extract medications - handling multiple dynamic entries
    const medications: Array<{ name?: string; reason?: string }> = []
    let medicationIndex = 0
    while (formData.get(`medication-${medicationIndex}-name`)) {
      medications.push({
        name: (formData.get(`medication-${medicationIndex}-name`) as string) || undefined,
        reason: (formData.get(`medication-${medicationIndex}-reason`) as string) || undefined,
      })
      medicationIndex++
    }

    // Extract additional information and consent
    const additionalInformation = (formData.get('additional-information') as string) || undefined
    const consent = {
      treatmentConsent: formData.get('treatment-consent') === 'on',
      minorConsentSignature: (formData.get('minor-consent-signature') as string) || undefined,
    }

    // Use Sanity client (automatically optimizes for read/write operations)
    const client = sanityClient

    // Prepare intake form data
    const intakeData: IntakeFormData = {
      firstName,
      lastName,
      email,
      phone: personalInfo.phoneDaytime || personalInfo.phoneEvening || undefined,
      personalInfo,
      emergencyContact,
      howDidYouHear,
      reasonForSeeking,
      medicalConditions,
      surgeries: surgeries.length > 0 ? surgeries : undefined,
      medications: medications.length > 0 ? medications : undefined,
      additionalInformation,
      consent,
    }

    // Create intake form submission in Sanity
    const submission = await createIntakeFormSubmission(client, intakeData)

    // Prepare emails to send using batch API
    const emailsToSend = []

    // Send user confirmation email
    try {
      console.log('Preparing user confirmation email for intake form submission...')

      // Generate HTML version of user confirmation
      const userConfirmationHtml = await render(
        UserIntakeNotification({
          firstName,
        })
      )

      // Generate text version of user confirmation
      const userConfirmationText = await render(
        UserIntakeNotification({
          firstName,
        }),
        {
          plainText: true,
        }
      )

      emailsToSend.push({
        from: 'Lymphatic Specialists of Madison <hello@lymphaticspecialistsofmadison.com>',
        to: [email],
        subject: 'Thank you for completing your intake form',
        html: userConfirmationHtml,
        text: userConfirmationText,
      })
    } catch (userEmailError) {
      console.error('Failed to prepare user confirmation email:', userEmailError)
      // Continue execution - admin notification can still be sent
    }

    // Send admin notification email
    try {
      console.log('Preparing admin notification for intake form submission...')

      // Generate HTML version of admin notification
      const notificationHtml = await render(
        IntakeNotification({
          firstName,
          lastName,
          email,
          phoneDaytime: personalInfo.phoneDaytime,
          phoneEvening: personalInfo.phoneEvening,
          dateOfBirth: personalInfo.dateOfBirth,
          emergencyContactName: emergencyContact.name,
          emergencyContactPhone: emergencyContact.phone,
          reasonForSeeking,
          additionalInformation,
        })
      )

      // Generate text version of admin notification
      const notificationText = await render(
        IntakeNotification({
          firstName,
          lastName,
          email,
          phoneDaytime: personalInfo.phoneDaytime,
          phoneEvening: personalInfo.phoneEvening,
          dateOfBirth: personalInfo.dateOfBirth,
          emergencyContactName: emergencyContact.name,
          emergencyContactPhone: emergencyContact.phone,
          reasonForSeeking,
          additionalInformation,
        }),
        {
          plainText: true,
        }
      )

      emailsToSend.push({
        from: 'Lymphatic Specialists Website <hello@lymphaticspecialistsofmadison.com>',
        to: ['cnrolnick@gmail.com'],
        subject: `New intake form submission from ${firstName} ${lastName}`,
        html: notificationHtml,
        text: notificationText,
      })
    } catch (adminEmailError) {
      console.error('Failed to prepare admin notification email:', adminEmailError)
      // Continue execution - user confirmation can still be sent
    }

    // Send all emails in batch
    if (emailsToSend.length > 0) {
      try {
        const { data: batchData, error: batchError } = await resend.batch.send(emailsToSend)

        if (batchError) {
          console.error('Error sending batch emails:', batchError)
        } else {
          console.log(`Successfully sent ${emailsToSend.length} emails:`, batchData)
        }
      } catch (emailError) {
        console.error('Email send error:', emailError)
        // Continue execution - form submission succeeded even if email failed
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message:
          'Thank you for submitting your intake form! We will review it and get back to you soon. Please check your email for a confirmation.',
        submissionId: submission._id,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Intake form submission error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred while processing your request.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

// Handle preflight OPTIONS requests for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
