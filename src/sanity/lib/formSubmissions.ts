// Types for form submissions matching the exact Sanity schema structures

export interface UserData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  isSubscribed?: boolean
}

// Medical Conditions structure matching intakeForm.ts schema exactly
export interface MedicalConditions {
  general?: {
    fever?: boolean
    cancerTreatment?: boolean
    lastChemotherapy?: boolean
    arteriosclerosis?: boolean
    carotidSinusIssues?: boolean
    hyperthyroidism?: boolean
    liverCirrhosis?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  earsNoseThroat?: {
    ringingInEars?: boolean
    sinusProblems?: boolean
    earaches?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  cardiovascular?: {
    chestPainOrPressure?: boolean
    swellingOfLegs?: boolean
    palpitations?: boolean
    varicoseVeins?: boolean
    dizziness?: boolean
    acuteDeepVeinThrombosis?: boolean
    congestiveHeartFailure?: boolean
    heartAttack?: boolean
    highLowBloodPressure?: boolean
    aneurysm?: boolean
    cardiacArrhythmia?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  gastroIntestinal?: {
    crohnsDisease?: boolean
    abdominalPain?: boolean
    surgicalImplant?: boolean
    giInflammation?: boolean
    diverticulitisOrDiverticulosis?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  urinary?: {
    kidneyFailure?: boolean
    kidneyStones?: boolean
    urinaryTractInfection?: boolean
    dialysis?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  femaleReproductive?: {
    currentlyPregnant?: boolean
    currentlyMenstruating?: boolean
    fibrocysticBreastDisease?: boolean
    iud?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  musculoskeletal?: {
    osteoporosis?: boolean
    osteoarthritis?: boolean
    hernia?: boolean
    rheumatoidArthritis?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  skin?: {
    cellulitisBacterialSkinInfection?: boolean
    rash?: boolean
    majorScars?: boolean
    lumps?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  hematologicLymphatic?: {
    cutsThatDoNotStopBleeding?: boolean
    enlargedLymphNodes?: boolean
    lymphNodesRemoved?: boolean
    frequentBruising?: boolean
    hivAids?: boolean
    factorVLeiden?: boolean
    clottingIssues?: boolean
    na?: boolean
    otherSpecify?: string
  }
  neurological?: {
    strokes?: boolean
    seizures?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  allergies?: {
    earFullness?: boolean
    sinusCongestion?: boolean
    recentSinusInjury?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
  emotional?: {
    stress?: boolean
    anxiety?: boolean
    difficultySleeping?: boolean
    depression?: boolean
    other?: boolean
    na?: boolean
    otherSpecify?: string
  }
}

export interface IntakeFormData {
  // User data - will be extracted to create/update user record
  firstName: string
  lastName: string
  email: string
  phone?: string

  // Personal Information Section (matching intakeForm.ts schema)
  personalInfo?: {
    firstName?: string
    lastName?: string
    phoneDaytime?: string
    phoneEvening?: string
    email?: string
    dateOfBirth?: string
    pronouns?: string
    address?: {
      streetAddress?: string
      addressLine2?: string
      city?: string
      state?: string
      zipCode?: string
      country?: string
    }
  }

  // Emergency Contact Section
  emergencyContact?: {
    name?: string
    phone?: string
    physician?: string
  }

  // How they heard about us
  howDidYouHear?: {
    source?: 'search' | 'doctor' | 'local' | 'friend' | 'social' | 'blog' | 'booksy' | 'other'
    otherSpecify?: string
  }

  // Reason for seeking MLD
  reasonForSeeking?: {
    purpose?: 'medical' | 'relaxation' | 'other'
    medicalStartDate?: string
    problemDescription?: string
  }

  // Medical Conditions (extensive categorized structure)
  medicalConditions?: MedicalConditions

  // Surgeries
  surgeries?: Array<{
    name?: string
    date?: string
    hospitalAndSurgeon?: string
  }>

  // Medications
  medications?: Array<{
    name?: string
    reason?: string
  }>

  // Additional Information
  additionalInformation?: string

  // Consent flags
  consent?: {
    treatmentConsent?: boolean
    minorConsentSignature?: string
  }
}

export interface ContactFormData {
  // User data - will be extracted to create/update user record
  firstName: string
  lastName: string
  emailAddress: string
  phoneNumber?: string

  // Form-specific fields (matching contactForm.ts schema exactly)
  messageBody?: string
  subscribeToNewsletter?: boolean
}

// Utility functions for creating/updating users and form submissions

/**
 * Create or update a user in Sanity
 */
export async function createOrUpdateUser(client: any, userData: UserData): Promise<string> {
  // Check if user already exists by email
  const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: userData.email,
  })

  if (existingUser) {
    // Update existing user
    const updatedUser = await client
      .patch(existingUser._id)
      .set({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || existingUser.phone,
        isSubscribed: userData.isSubscribed ?? existingUser.isSubscribed,
      })
      .commit()

    return updatedUser._id
  } else {
    // Create new user
    const newUser = await client.create({
      _type: 'user',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      isSubscribed: userData.isSubscribed || false,
    })

    return newUser._id
  }
}

/**
 * Create an intake form submission
 */
export async function createIntakeFormSubmission(
  client: any,
  formData: IntakeFormData
): Promise<any> {
  // Create or update user first - extract user data from form data
  const userData: UserData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    isSubscribed: false, // Intake form doesn't have newsletter subscription
  }

  const userId = await createOrUpdateUser(client, userData)

  // Create intake form submission with exact schema structure
  const submission = await client.create({
    _type: 'intakeForm',
    user: {
      _type: 'reference',
      _ref: userId,
    },
    personalInfo: formData.personalInfo,
    emergencyContact: formData.emergencyContact,
    howDidYouHear: formData.howDidYouHear,
    reasonForSeeking: formData.reasonForSeeking,
    medicalConditions: formData.medicalConditions,
    surgeries: formData.surgeries,
    medications: formData.medications,
    additionalInformation: formData.additionalInformation,
    consent: formData.consent,
  })

  return submission
}

/**
 * Create a contact form submission
 */
export async function createContactFormSubmission(
  client: any,
  formData: ContactFormData
): Promise<any> {
  // Create or update user first - map contact form fields to user data
  const userData: UserData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.emailAddress, // contactForm uses emailAddress field
    phone: formData.phoneNumber, // contactForm uses phoneNumber field
    isSubscribed: formData.subscribeToNewsletter || false,
  }

  const userId = await createOrUpdateUser(client, userData)

  // Create contact form submission with exact schema structure
  const submission = await client.create({
    _type: 'contactForm',
    user: {
      _type: 'reference',
      _ref: userId,
    },
    messageBody: formData.messageBody,
    status: 'new',
  })

  return submission
}

/**
 * Example usage:
 *
 * const client = createClient({
 *   projectId: 'your-project-id',
 *   dataset: 'production',
 *   token: 'your-write-token',
 *   useCdn: false,
 * })
 *
 * // For contact form (matching contact.astro field names):
 * const contactData: ContactFormData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   emailAddress: 'john@example.com',  // Note: emailAddress (not email)
 *   phoneNumber: '(555) 123-4567',     // Note: phoneNumber (not phone)
 *   messageBody: 'I have questions about your services.',
 *   subscribeToNewsletter: true,
 * }
 *
 * await createContactFormSubmission(client, contactData)
 *
 * // For intake form (matching intake-form.astro structure):
 * const intakeData: IntakeFormData = {
 *   firstName: 'Jane',
 *   lastName: 'Smith',
 *   email: 'jane@example.com',
 *   personalInfo: {
 *     firstName: 'Jane',
 *     lastName: 'Smith',
 *     email: 'jane@example.com',
 *     phoneDaytime: '(555) 123-4567',
 *     phoneEvening: '(555) 987-6543',
 *     dateOfBirth: '1990-01-01',
 *     pronouns: 'she/her',
 *     address: {
 *       streetAddress: '123 Main St',
 *       addressLine2: 'Apt 4B',
 *       city: 'Madison',
 *       state: 'WI',
 *       zipCode: '53703',
 *       country: 'United States',
 *     },
 *   },
 *   emergencyContact: {
 *     name: 'John Smith',
 *     phone: '(555) 111-2222',
 *     physician: 'Dr. Jones at Madison Clinic',
 *   },
 *   howDidYouHear: {
 *     source: 'doctor',
 *   },
 *   reasonForSeeking: {
 *     purpose: 'medical',
 *     medicalStartDate: '2024-01-15',
 *     problemDescription: 'Lymphedema following surgery',
 *   },
 *   medicalConditions: {
 *     general: {
 *       fever: false,
 *       cancerTreatment: true,
 *       na: false,
 *     },
 *     gastroIntestinal: {
 *       crohnsDisease: false,
 *       surgicalImplant: true,
 *       diverticulitisOrDiverticulosis: false,
 *       na: false,
 *     },
 *     cardiovascular: {
 *       swellingOfLegs: true,
 *       other: false,
 *       na: false,
 *     },
 *     hematologicLymphatic: {
 *       cutsThatDoNotStopBleeding: false,
 *       enlargedLymphNodes: true,
 *       lymphNodesRemoved: true,
 *       na: false,
 *     },
 *   },
 *   surgeries: [
 *     {
 *       name: 'Lymph node removal',
 *       date: '2024-01-10',
 *       hospitalAndSurgeon: 'UW Health - Dr. Johnson',
 *     },
 *   ],
 *   medications: [
 *     {
 *       name: 'Compression therapy',
 *       reason: 'Lymphedema management',
 *     },
 *   ],
 *   additionalInformation: 'Please be gentle around surgical site.',
 *   consent: {
 *     treatmentConsent: true,
 *   },
 * }
 *
 * await createIntakeFormSubmission(client, intakeData)
 */
