// Email validation
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant pattern, practical version
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// International phone validation (E.164-ish, allows +, spaces, dashes, parentheses)
export const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  // Strip spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Must start with + and have 8-15 digits, OR be a local number of 8-15 digits
  const phoneRegex = /^\+?[0-9]{8,15}$/;
  return phoneRegex.test(cleaned);
};

// Name validation (letters, spaces, hyphens, apostrophes, accents)
export const isValidName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0600-\u06FF\s'-]{2,60}$/;
  return nameRegex.test(name.trim());
};

// Passport number (alphanumeric, 5-20 chars)
export const isValidPassport = (passport: string): boolean => {
  if (!passport || typeof passport !== 'string') return false;
  const passportRegex = /^[A-Z0-9]{5,20}$/i;
  return passportRegex.test(passport.trim());
};

// Nationality (letters and spaces only)
export const isValidNationality = (nationality: string): boolean => {
  if (!nationality || typeof nationality !== 'string') return false;
  const regex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  return regex.test(nationality.trim());
};

// URL validation (for image URLs)
export const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Slug validation (lowercase letters, numbers, hyphens only)
export const isValidSlug = (slug: string): boolean => {
  if (!slug || typeof slug !== 'string') return false;
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug.trim());
};

// Date validation (must be a valid date string)
export const isValidDate = (date: string): boolean => {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime());
};

// Date in the future (for arrival dates, etc.)
export const isFutureDate = (date: string): boolean => {
  if (!isValidDate(date)) return false;
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
};

// Date range validation (departure after arrival)
export const isValidDateRange = (arrival: string, departure: string): boolean => {
  if (!isValidDate(arrival) || !isValidDate(departure)) return false;
  return new Date(departure) > new Date(arrival);
};

// Trim and normalize phone (keeps leading +)
export const normalizePhone = (phone: string): string => {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
};

// Trim email
export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};