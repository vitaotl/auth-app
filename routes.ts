/**
 * An array of routes that are public.
 * These router do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"]

/**
 * An array of routes that are private.
 * These router require authentication and redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "auth/error"]

/**
 * The prefix for Api authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
