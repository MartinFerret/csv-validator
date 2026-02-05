/**
 * Credits Management System
 *
 * Manages file credits stored in localStorage.
 * Credits are granted after successful Stripe payment and verified via session ID.
 */

const CREDITS_KEY = 'cleancsv_credits';
const USED_SESSIONS_KEY = 'cleancsv_used_sessions';

interface CreditsData {
  credits: number;
  purchasedAt: string[];
  lastUpdated: string;
}

interface UsedSessions {
  [sessionId: string]: {
    usedAt: string;
    creditsGranted: number;
  };
}

/**
 * Get current credits count
 */
export function getCredits(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const data = localStorage.getItem(CREDITS_KEY);
    if (!data) return 0;

    const parsed: CreditsData = JSON.parse(data);
    return parsed.credits || 0;
  } catch {
    return 0;
  }
}

/**
 * Add credits after successful payment
 */
export function addCredits(amount: number, sessionId?: string): number {
  if (typeof window === 'undefined') return 0;

  // Check if this session was already used
  if (sessionId && isSessionUsed(sessionId)) {
    console.log('Session already used, credits not added');
    return getCredits();
  }

  try {
    const data = localStorage.getItem(CREDITS_KEY);
    const existing: CreditsData = data ? JSON.parse(data) : {
      credits: 0,
      purchasedAt: [],
      lastUpdated: new Date().toISOString(),
    };

    existing.credits += amount;
    existing.purchasedAt.push(new Date().toISOString());
    existing.lastUpdated = new Date().toISOString();

    localStorage.setItem(CREDITS_KEY, JSON.stringify(existing));

    // Mark session as used
    if (sessionId) {
      markSessionUsed(sessionId, amount);
    }

    return existing.credits;
  } catch {
    return 0;
  }
}

/**
 * Use one credit for a download
 */
export function useCredit(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const credits = getCredits();
    if (credits <= 0) return false;

    const data = localStorage.getItem(CREDITS_KEY);
    if (!data) return false;

    const parsed: CreditsData = JSON.parse(data);
    parsed.credits -= 1;
    parsed.lastUpdated = new Date().toISOString();

    localStorage.setItem(CREDITS_KEY, JSON.stringify(parsed));
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a Stripe session was already used
 */
export function isSessionUsed(sessionId: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const data = localStorage.getItem(USED_SESSIONS_KEY);
    if (!data) return false;

    const sessions: UsedSessions = JSON.parse(data);
    return !!sessions[sessionId];
  } catch {
    return false;
  }
}

/**
 * Mark a session as used
 */
function markSessionUsed(sessionId: string, creditsGranted: number): void {
  if (typeof window === 'undefined') return;

  try {
    const data = localStorage.getItem(USED_SESSIONS_KEY);
    const sessions: UsedSessions = data ? JSON.parse(data) : {};

    sessions[sessionId] = {
      usedAt: new Date().toISOString(),
      creditsGranted,
    };

    localStorage.setItem(USED_SESSIONS_KEY, JSON.stringify(sessions));
  } catch {
    console.error('Failed to mark session as used');
  }
}

/**
 * Get credits data for debugging
 */
export function getCreditsData(): CreditsData | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(CREDITS_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Clear all credits (for testing)
 */
export function clearCredits(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CREDITS_KEY);
  localStorage.removeItem(USED_SESSIONS_KEY);
}
