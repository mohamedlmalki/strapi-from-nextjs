/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns A boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};