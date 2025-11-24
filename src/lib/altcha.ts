import { verifySolution } from 'altcha-lib'

interface AltchaVerificationResult {
  isValid: boolean
  error?: string
}

/**
 * Verifies Altcha challenge solution
 */
export async function verifyAltcha(altchaPayload: string): Promise<AltchaVerificationResult> {
  if (!altchaPayload) {
    return {
      isValid: false,
      error: 'Please complete the security challenge.'
    }
  }

  try {
    // Parse the Altcha payload
    const payload = JSON.parse(altchaPayload)
    
    // Verify the solution using the correct API
    const isValid = await verifySolution(payload, '')

    if (!isValid) {
      return {
        isValid: false,
        error: 'Security challenge verification failed. Please try again.'
      }
    }

    return { isValid: true }
    
  } catch (error) {
    console.error('Altcha verification error:', error)
    return {
      isValid: false,
      error: 'Security challenge verification failed. Please try again.'
    }
  }
}

/**
 * Combined spam protection check including Altcha
 */
export async function checkSpamProtectionWithAltcha(
  formData: FormData
): Promise<{ isSpam: boolean; reason?: string }> {
  // First verify Altcha
  const altchaPayload = formData.get('altcha') as string
  const altchaResult = await verifyAltcha(altchaPayload)
  
  if (!altchaResult.isValid) {
    return {
      isSpam: true,
      reason: altchaResult.error || 'Please complete the security challenge.'
    }
  }

  // Your existing spam checks can stay here if you want additional protection
  // For now, if Altcha passes, we consider it valid
  return { isSpam: false }
}