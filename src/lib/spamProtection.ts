interface SpamCheckResult {
  isSpam: boolean
  reason?: string
}

interface RateLimitEntry {
  submissions: number
  firstSubmission: number
  lastSubmission: number
}

// In-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Rate limit: 3 submissions per IP per 10 minutes
const MAX_SUBMISSIONS = 3
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minutes in ms

// Minimum time between form load and submission (prevents instant bot submissions)
const MIN_FORM_TIME = 3000 // 3 seconds

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW
  
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.lastSubmission < cutoff) {
      rateLimitStore.delete(ip)
    }
  }
}, 60 * 60 * 1000) // 1 hour

export function getClientIP(request: Request): string {
  // Check common headers for real IP (behind proxies/CDNs)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  const realIP = request.headers.get('x-real-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwardedFor) {
    // X-Forwarded-For can be a comma-separated list, take the first IP
    return forwardedFor.split(',')[0].trim()
  }
  
  return 'unknown'
}

export function checkRateLimit(ip: string): SpamCheckResult {
  if (ip === 'unknown') {
    return { isSpam: false } // Don't block if we can't determine IP
  }
  
  const now = Date.now()
  const entry = rateLimitStore.get(ip)
  
  if (!entry) {
    // First submission from this IP
    rateLimitStore.set(ip, {
      submissions: 1,
      firstSubmission: now,
      lastSubmission: now
    })
    return { isSpam: false }
  }
  
  // Clean up old submissions outside the window
  if (now - entry.firstSubmission > RATE_LIMIT_WINDOW) {
    // Reset the window
    rateLimitStore.set(ip, {
      submissions: 1,
      firstSubmission: now,
      lastSubmission: now
    })
    return { isSpam: false }
  }
  
  // Check if within rate limit
  if (entry.submissions >= MAX_SUBMISSIONS) {
    console.log(`Rate limit exceeded for IP: ${ip}`)
    return {
      isSpam: true,
      reason: 'Too many submissions. Please wait before submitting again.'
    }
  }
  
  // Update submission count
  entry.submissions++
  entry.lastSubmission = now
  rateLimitStore.set(ip, entry)
  
  return { isSpam: false }
}

export function checkFormTiming(formData: FormData): SpamCheckResult {
  const formLoadTime = formData.get('form-load-time') as string
  
  if (!formLoadTime) {
    // If no timestamp, allow submission (backward compatibility)
    return { isSpam: false }
  }
  
  try {
    const loadTime = parseInt(formLoadTime)
    const submissionTime = Date.now()
    const timeDiff = submissionTime - loadTime
    
    if (timeDiff < MIN_FORM_TIME) {
      console.log(`Form submitted too quickly: ${timeDiff}ms`)
      return {
        isSpam: true,
        reason: 'Form submitted too quickly. Please try again.'
      }
    }
    
    // Also check if timestamp is too old (>1 hour) - possible replay attack
    const oneHour = 60 * 60 * 1000
    if (timeDiff > oneHour) {
      console.log(`Form timestamp too old: ${timeDiff}ms`)
      return {
        isSpam: true,
        reason: 'Form session expired. Please reload the page and try again.'
      }
    }
    
  } catch (error) {
    console.log('Invalid form timestamp:', formLoadTime)
    // Allow submission but log the issue
    return { isSpam: false }
  }
  
  return { isSpam: false }
}

export function enhancedContentAnalysis(text: string): SpamCheckResult {
  if (!text || !text.trim()) {
    return { isSpam: false }
  }
  
  const content = text.trim().toLowerCase()
  
  // Detect excessive repeated characters (e.g., "aaaaaaaaaa")
  const repeatedChars = /(.)\1{8,}/g
  if (repeatedChars.test(content)) {
    return {
      isSpam: true,
      reason: 'Message contains suspicious repeated characters.'
    }
  }
  
  // Detect excessive punctuation
  const punctuationRatio = (content.match(/[!@#$%^&*()_+=\[\]{}\|\\:";'<>?,.\/~`]/g) || []).length / content.length
  if (punctuationRatio > 0.3) {
    return {
      isSpam: true,
      reason: 'Message contains too many special characters.'
    }
  }
  
  // Detect URLs (basic detection)
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-z0-9.-]+\.[a-z]{2,}\b)/gi
  const urls = content.match(urlPattern)
  if (urls && urls.length > 2) {
    return {
      isSpam: true,
      reason: 'Message contains too many links.'
    }
  }
  
  // Detect promotional keywords
  const promotionalKeywords = [
    'click here',
    'limited time',
    'act now',
    'urgent',
    'make money',
    'guaranteed',
    'risk free',
    'no cost',
    'special offer',
    'buy now',
    'order now'
  ]
  
  const foundKeywords = promotionalKeywords.filter(keyword => content.includes(keyword))
  if (foundKeywords.length > 2) {
    return {
      isSpam: true,
      reason: 'Message appears to be promotional spam.'
    }
  }
  
  return { isSpam: false }
}

export function checkSpamProtection(request: Request, formData: FormData): SpamCheckResult {
  // Check rate limiting
  const ip = getClientIP(request)
  const rateLimitCheck = checkRateLimit(ip)
  if (rateLimitCheck.isSpam) {
    return rateLimitCheck
  }
  
  // Check form timing
  const timingCheck = checkFormTiming(formData)
  if (timingCheck.isSpam) {
    return timingCheck
  }
  
  // Check message content if present
  const message = formData.get('message') as string
  if (message) {
    const contentCheck = enhancedContentAnalysis(message)
    if (contentCheck.isSpam) {
      return contentCheck
    }
  }
  
  return { isSpam: false }
}