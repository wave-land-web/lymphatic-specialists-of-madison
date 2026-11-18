/**
 * Normalizes an email address by converting it to lowercase and trimming whitespace
 * @param email - The email address to normalize
 * @returns The normalized email address
 */
export function normalizeEmail(email: string) {
  return email.toLowerCase().trim()
}
