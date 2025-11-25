import { verifySolution } from 'altcha-lib'

interface AltchaVerificationResult {
  isValid: boolean
  error?: string
}

// IMPORTANT: Must match the key in challenge.ts
const HMAC_KEY = import.meta.env.ALTCHA_API_KEY

/**
 * Verifies Altcha challenge solution
 */
export async function verifyAltcha(altchaPayload: string): Promise<AltchaVerificationResult> {
  if (!altchaPayload) {
    return {
      isValid: false,
      error: 'Please complete the security challenge.',
    }
  }

  try {
    // Verify the solution with the HMAC key
    // Note: verifySolution accepts either Base64-encoded string or object
    const isValid = await verifySolution(altchaPayload, HMAC_KEY)

    console.log('Altcha verification result:', isValid)

    if (!isValid) {
      return {
        isValid: false,
        error: 'Security challenge verification failed. Please try again.',
      }
    }

    return { isValid: true }
  } catch (error) {
    console.error('Altcha verification error:', error)
    return {
      isValid: false,
      error: 'Security challenge verification failed. Please try again.',
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
      reason: altchaResult.error || 'Please complete the security challenge.',
    }
  }

  // Your existing spam checks can stay here if you want additional protection
  // For now, if Altcha passes, we consider it valid
  return { isSpam: false }
}
