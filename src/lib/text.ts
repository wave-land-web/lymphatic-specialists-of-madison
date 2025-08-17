/**
 * Capitalizes the first letter of a string
 * @param text - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Normalizes an email address by converting it to lowercase and trimming whitespace
 * @param email - The email address to normalize
 * @returns The normalized email address
 */
export function normalizeEmail(email: string) {
  return email.toLowerCase().trim()
}

/**
 * Formats a date string to MM-DD-YYYY format
 * @param dateString - The date string to format (e.g., "1988-06-18" or "2024-12-31")
 * @returns The formatted date in MM-DD-YYYY format, or the original string if invalid
 */
export function formatDate(dateString: string): string {
  if (!dateString) return dateString

  try {
    // Parse the date string
    const date = new Date(dateString)

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return dateString // Return original if invalid
    }

    // Format as MM-DD-YYYY
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    return `${month}-${day}-${year}`
  } catch (error) {
    // Return original string if parsing fails
    return dateString
  }
}
