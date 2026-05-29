import { randomBytes, scrypt, timingSafeEqual } from 'crypto'

/**
 * Hash a password using scrypt. The returned string will be in the format "salt:hash".
 */
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const hash = await scryptAsync(password, salt)
  return `${salt}:${hash.toString('hex')}`
}

/**
 * Helper function to promisify scrypt, since the built-in scrypt function uses a callback.
 */
async function scryptAsync(password: string, salt: string) {
  return new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
    scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error)
      } else {
        resolve(derivedKey)
      }
    })
  })
}

/**
 * Verify a password against a stored hash. The stored hash should be in the format "salt:hash".
 */
export async function verifyPassword(password: string, storedHash: string) {
  const [salt, hashHex] = storedHash.split(':')
  const stored = Buffer.from(hashHex, 'hex')
  const derived = await scryptAsync(password, salt)

  // Use timingSafeEqual to prevent timing attacks
  return timingSafeEqual(stored, derived)
}
