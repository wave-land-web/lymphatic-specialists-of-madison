// TODO: add proper validation and error handling
import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'intakeForm',
  title: 'Intake Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required().error('User reference is required'),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      description: 'When the form was submitted',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),

    // Personal Information Section
    defineField({
      name: 'personalInfo',
      title: 'Personal Information',
      type: 'object',
      fields: [
        { name: 'firstName', title: 'First Name', type: 'string' },
        { name: 'lastName', title: 'Last Name', type: 'string' },
        { name: 'phoneDaytime', title: 'Phone (day)', type: 'string' },
        { name: 'phoneEvening', title: 'Phone (evening)', type: 'string' },
        { name: 'email', title: 'Email', type: 'email' },
        { name: 'dateOfBirth', title: 'Date of Birth', type: 'date' },
        { name: 'pronouns', title: 'Pronouns', type: 'string' },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            { name: 'streetAddress', title: 'Street Address', type: 'string' },
            { name: 'addressLine2', title: 'Address Line 2', type: 'string' },
            { name: 'city', title: 'City', type: 'string' },
            { name: 'state', title: 'State', type: 'string' },
            { name: 'zipCode', title: 'ZIP Code', type: 'string' },
            { name: 'country', title: 'Country', type: 'string' },
          ],
        },
      ],
    }),

    // Emergency Contact Section
    defineField({
      name: 'emergencyContact',
      title: 'Emergency Contact',
      type: 'object',
      fields: [
        { name: 'name', title: 'Emergency Contact Name', type: 'string' },
        { name: 'phone', title: 'Emergency Contact Phone', type: 'string' },
        { name: 'physician', title: 'Primary Care Physician and Clinic', type: 'string' },
      ],
    }),

    // How they heard about us
    defineField({
      name: 'howDidYouHear',
      title: 'How Did You Hear About Us',
      type: 'object',
      fields: [
        {
          name: 'source',
          title: 'Source',
          type: 'string',
          options: {
            list: [
              { title: 'Search engine (google, etc)', value: 'search' },
              { title: 'Doctor/surgeon', value: 'doctor' },
              { title: 'Local business', value: 'local' },
              { title: 'Friend or colleague', value: 'friend' },
              { title: 'Social media', value: 'social' },
              { title: 'Blog', value: 'blog' },
              { title: 'Booksy', value: 'booksy' },
              { title: 'Other', value: 'other' },
            ],
          },
        },
        { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
      ],
    }),

    // Reason for seeking MLD
    defineField({
      name: 'reasonForSeeking',
      title: 'Reason for Seeking MLD',
      type: 'object',
      fields: [
        {
          name: 'purpose',
          title: 'Purpose',
          type: 'string',
          options: {
            list: [
              { title: 'Medical reason', value: 'medical' },
              { title: 'Relaxation', value: 'relaxation' },
              { title: 'Other', value: 'other' },
            ],
          },
        },
        { name: 'medicalStartDate', title: 'When did medical problem start?', type: 'string' },
        { name: 'problemDescription', title: 'Problem Description', type: 'text' },
      ],
    }),

    // Medical Conditions - extensive categorized structure matching the form
    defineField({
      name: 'medicalConditions',
      title: 'Medical Conditions',
      type: 'object',
      fields: [
        {
          name: 'general',
          title: 'General',
          type: 'object',
          fields: [
            { name: 'fever', title: 'Fever', type: 'boolean' },
            { name: 'cancerTreatment', title: 'Undergoing cancer treatment', type: 'boolean' },
            { name: 'lastChemotherapy', title: 'Last chemotherapy session', type: 'boolean' },
            { name: 'arteriosclerosis', title: 'Arteriosclerosis', type: 'boolean' },
            { name: 'carotidSinusIssues', title: 'Carotid sinus issues', type: 'boolean' },
            { name: 'hyperthyroidism', title: 'Hyperthyroidism', type: 'boolean' },
            { name: 'liverCirrhosis', title: 'Liver Cirrhosis', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'earsNoseThroat',
          title: 'Ears, Nose, Throat',
          type: 'object',
          fields: [
            { name: 'ringingInEars', title: 'Ringing in ears', type: 'boolean' },
            { name: 'sinusProblems', title: 'Sinus problems', type: 'boolean' },
            { name: 'earaches', title: 'Earaches', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'cardiovascular',
          title: 'Cardiovascular',
          type: 'object',
          fields: [
            { name: 'chestPainOrPressure', title: 'Chest pain or pressure', type: 'boolean' },
            { name: 'swellingOfLegs', title: 'Swelling of legs', type: 'boolean' },
            { name: 'palpitations', title: 'Palpitations', type: 'boolean' },
            { name: 'varicoseVeins', title: 'Varicose veins', type: 'boolean' },
            { name: 'dizziness', title: 'Dizziness', type: 'boolean' },
            {
              name: 'acuteDeepVeinThrombosis',
              title: 'Acute deep vein thrombosis',
              type: 'boolean',
            },
            { name: 'congestiveHeartFailure', title: 'Congestive heart failure', type: 'boolean' },
            { name: 'heartAttack', title: 'Heart attack', type: 'boolean' },
            { name: 'highLowBloodPressure', title: 'High/low blood pressure', type: 'boolean' },
            { name: 'aneurysm', title: 'Aneurysm', type: 'boolean' },
            { name: 'cardiacArrhythmia', title: 'Cardiac arrhythmia', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'gastroIntestinal',
          title: 'Gastro-Intestinal',
          type: 'object',
          fields: [
            { name: 'crohnsDisease', title: "Crohn's disease", type: 'boolean' },
            { name: 'abdominalPain', title: 'Abdominal pain', type: 'boolean' },
            {
              name: 'surgicalImplant',
              title: 'Surgical implant (mesh or other)',
              type: 'boolean',
            },
            { name: 'giInflammation', title: 'GI inflammation', type: 'boolean' },
            {
              name: 'diverticulitisOrDiverticulosis',
              title: 'Diverticulitis/Diverticulosis',
              type: 'boolean',
            },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'urinary',
          title: 'Urinary',
          type: 'object',
          fields: [
            { name: 'kidneyFailure', title: 'Kidney failure', type: 'boolean' },
            { name: 'kidneyStones', title: 'Kidney stones', type: 'boolean' },
            { name: 'urinaryTractInfection', title: 'Urinary tract infection', type: 'boolean' },
            { name: 'dialysis', title: 'Dialysis', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'femaleReproductive',
          title: 'Female Reproductive',
          type: 'object',
          fields: [
            { name: 'currentlyPregnant', title: 'Currently pregnant', type: 'boolean' },
            { name: 'currentlyMenstruating', title: 'Currently menstruating', type: 'boolean' },
            {
              name: 'fibrocysticBreastDisease',
              title: 'Fibrocystic breast disease',
              type: 'boolean',
            },
            { name: 'iud', title: 'IUD', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'musculoskeletal',
          title: 'Musculoskeletal',
          type: 'object',
          fields: [
            { name: 'osteoporosis', title: 'Osteoporosis', type: 'boolean' },
            { name: 'osteoarthritis', title: 'Osteoarthritis', type: 'boolean' },
            { name: 'hernia', title: 'Hernia', type: 'boolean' },
            { name: 'rheumatoidArthritis', title: 'Rheumatoid arthritis', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'skin',
          title: 'Skin',
          type: 'object',
          fields: [
            {
              name: 'cellulitisBacterialSkinInfection',
              title: 'Cellulitis (bacterial skin infection)',
              type: 'boolean',
            },
            { name: 'rash', title: 'Rash', type: 'boolean' },
            { name: 'majorScars', title: 'Major scars', type: 'boolean' },
            { name: 'lumps', title: 'Lumps', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'hematologicLymphatic',
          title: 'Hematologic/Lymphatic',
          type: 'object',
          fields: [
            {
              name: 'cutsThatDoNotStopBleeding',
              title: 'Cuts that do not stop bleeding',
              type: 'boolean',
            },
            { name: 'enlargedLymphNodes', title: 'Enlarged lymph nodes (glands)', type: 'boolean' },
            { name: 'lymphNodesRemoved', title: 'Lymph nodes removed', type: 'boolean' },
            { name: 'frequentBruising', title: 'Frequent bruising', type: 'boolean' },
            { name: 'hivAids', title: 'HIV/AIDS', type: 'boolean' },
            { name: 'factorVLeiden', title: 'Factor V Leiden', type: 'boolean' },
            { name: 'clottingIssues', title: 'Clotting issues', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'neurological',
          title: 'Neurological',
          type: 'object',
          fields: [
            { name: 'strokes', title: 'Strokes', type: 'boolean' },
            { name: 'seizures', title: 'Seizures', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'allergies',
          title: 'Allergies',
          type: 'object',
          fields: [
            { name: 'earFullness', title: 'Ear Fullness', type: 'boolean' },
            { name: 'sinusCongestion', title: 'Sinus Congestion', type: 'boolean' },
            { name: 'recentSinusInjury', title: 'Recent Sinus Injury', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
        {
          name: 'emotional',
          title: 'Emotional',
          type: 'object',
          fields: [
            { name: 'stress', title: 'Stress', type: 'boolean' },
            { name: 'anxiety', title: 'Anxiety', type: 'boolean' },
            { name: 'difficultySleeping', title: 'Difficulty Sleeping', type: 'boolean' },
            { name: 'depression', title: 'Depression', type: 'boolean' },
            { name: 'other', title: 'Other', type: 'boolean' },
            { name: 'na', title: 'N/A', type: 'boolean' },
            { name: 'otherSpecify', title: 'Other Specify', type: 'text' },
          ],
        },
      ],
    }),

    // Surgeries
    defineField({
      name: 'surgeries',
      title: 'Surgeries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Surgery', type: 'string' },
            { name: 'date', title: 'Date', type: 'date' },
            { name: 'hospitalAndSurgeon', title: 'Hospital and Surgeon', type: 'string' },
          ],
        },
      ],
    }),

    // Medications
    defineField({
      name: 'medications',
      title: 'Medications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Medication', type: 'string' },
            { name: 'reason', title: 'Reason', type: 'string' },
          ],
        },
      ],
    }),

    // Additional Information
    defineField({
      name: 'additionalInformation',
      title: 'Additional Information',
      type: 'text',
      description: 'Any additional information about needs before session',
    }),

    // Consent flags
    defineField({
      name: 'consent',
      title: 'Consent and Understanding',
      type: 'object',
      fields: [
        {
          name: 'treatmentConsent',
          title: 'Treatment Consent',
          type: 'boolean',
          description: 'Consent to treatment terms',
        },
        {
          name: 'minorConsentSignature',
          title: 'Consent to Treatment of Minor',
          type: 'string',
          description: 'Signature of parent or guardian (if applicable)',
        },
      ],
    }),
  ],

  preview: {
    select: {
      userFirstName: 'user.firstName',
      userLastName: 'user.lastName',
      firstName: 'personalInfo.firstName',
      lastName: 'personalInfo.lastName',
      submittedAt: 'submittedAt',
    },
    prepare(selection) {
      const { userFirstName, userLastName, firstName, lastName, submittedAt } = selection
      // Use user reference name first, then form firstName/lastName as fallback
      const userName =
        `${userFirstName || ''} ${userLastName || ''}`.trim() ||
        `${firstName || ''} ${lastName || ''}`.trim() ||
        'Unknown User'
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'Unknown Date'

      return {
        title: `Intake Form - ${userName}`,
        subtitle: `Submitted: ${date}`,
        media: EnvelopeIcon,
      }
    },
  },
})
