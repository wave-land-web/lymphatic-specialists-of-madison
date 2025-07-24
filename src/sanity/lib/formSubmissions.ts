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
    _key?: string // Added for Sanity array item identification
  }>

  // Medications
  medications?: Array<{
    name?: string
    reason?: string
    _key?: string // Added for Sanity array item identification
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

  // Add _key properties to array items for Sanity
  // Sanity requires unique _key properties for all array items when created via API client
  // Without these, you'll get "Missing keys" warnings in Sanity Studio
  const surgeriesWithKeys = formData.surgeries?.map((surgery, index) => ({
    ...surgery,
    _key: `surgery-${Date.now()}-${index}`,
  }))

  const medicationsWithKeys = formData.medications?.map((medication, index) => ({
    ...medication,
    _key: `medication-${Date.now()}-${index}`,
  }))

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
    surgeries: surgeriesWithKeys,
    medications: medicationsWithKeys,
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
    submittedAt: new Date().toISOString(),
    messageBody: formData.messageBody,
    status: 'new',
  })

  return submission
}
